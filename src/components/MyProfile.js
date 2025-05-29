import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MyProfile.css";

function MyProfile() {
  const [activeTab, setActiveTab] = useState("myListings");
  const [searchQuery, setSearchQuery] = useState("");

  /* (For change password in case implemented)
  const [oldPasswordType, setOldPasswordType] = useState("password");
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const [oldPassView, setOldPassView] = useState("bi bi-eye-fill");
  const [newPassView, setNewPassView] = useState("bi bi-eye-fill");
  const [confirmPassView, setConfirmPassView] = useState("bi bi-eye-fill");*/

  const [userData, setUserData] = useState([]);

  const navigate = useNavigate();


  const ip = process.env.REACT_APP_LAPTOP_IP; //IP address (see env file for set up)
  useEffect(() => {
    //Checking if logged in, if not redirected to log-in
    fetch(`${ip}/tua_marketplace/fetchSession.php`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.user_id) {
          navigate("/"); // Redirect to login if not authenticated
        }
      })
      .catch((error) => {
        console.error("Error fetching session data:", error);
      });


    //fetching account owner details
    fetch(`${ip}/tua_marketplace/fetchMyProfileDeets.php`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching session data:", error);
      });

    //fetching items owned by account owner
    fetch(`${ip}/tua_marketplace/fetchMyProfileItems.php`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
      })
      .catch((error) => {
        console.error("Error fetching session data:", error);
      });

  }, []);
  

  /* (For change password in case implemented)
  const togglePassword = (field) => {
    if (field === "oldPassword") {
      setOldPasswordType(oldPasswordType === "password" ? "text" : "password");
      setOldPassView(oldPassView === "bi bi-eye-fill" ? "bi bi-eye-slash-fill" : "bi bi-eye-fill");
    } 
    else if (field === "newPassword") {
      setNewPasswordType(newPasswordType === "password" ? "text" : "password");
      setNewPassView(newPassView === "bi bi-eye-fill" ? "bi bi-eye-slash-fill" : "bi bi-eye-fill");
    } 
    else if (field === "confirmPassword") {
      setConfirmPasswordType(confirmPasswordType === "password" ? "text" : "password");
      setConfirmPassView(confirmPassView === "bi bi-eye-fill" ? "bi bi-eye-slash-fill" : "bi bi-eye-fill");
    }
  };*/


  const handleMarkSold = () => {
    window.confirm("Are you sure?");

  }


  const [item, setItem] = useState([]);

  // Filter items based on search input
  const filteredItems = item.filter((item) =>
    item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <main>
        {/* PROFILE */}
        <div className="profile-container">
          <div className="profile-nameBox">
            <div className="profile-coverBG"></div>
            <div className="profile-pic">
              <img src={userData.profile_pic} alt="Profile Photo" />
             
            </div>
            <div className="profile-name">
              <h1>{userData.first_name + " " + userData.last_name}</h1>
              <p>{userData.email}</p>
              <div className="rating-container">
                <span id="starReview">
                  <i className="bi bi-star-fill"></i>
                </span>
                <p className="rating-score">{"0.0"}</p>
              </div>
            </div>
           
          </div>

          {/* PROFILE TABS */}
          <div className="profile-tabs">
            <div className="navMenu">
              <a href="#myListings" onClick={() => setActiveTab("myListings")}>
                My Listings
              </a>
              <a href="#reviews" onClick={() => setActiveTab("reviews")}>
                Reviews
              </a>
              <a href="#userDetails" onClick={() => setActiveTab("details")}>
                User Details
              </a>
               <a href="#likedItems" onClick={() => setActiveTab("liked")}>
                Liked Items
              </a>
            </div>
          </div>

          {/* Listings Tab */}
          <div className="myListings" style={{ display: activeTab === "myListings" ? "block" : "none" }}>
            <div className="listingCard">
              <h2>My Listings</h2>

              <div className="search-container">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search items..."
                />
              </div>

              <div className="items">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <div className="itemCard" key={item.item_id}>
                      <div className="soldBanner" style={{display:"none"}}> {/*set this up if item is considered sold*/}
                        SOLD
                      </div>
                      <Link
                        to={`/itemdetails/${item.item_id}/${item.item_name}`}
                        className="item-details-link"> 
                        <img
                          src={item.preview_pic}
                          style={{
                            width: "180px",
                            height: "180px",
                            border: "3px solid green",
                            borderRadius: "12px",
                            alignItems: "center",
                            marginLeft: "5.5px"
                          }}
                          alt="Item"
                        />
                      </Link> 
                      <div className="itemDeets">
                        <Link
                            to={`/itemdetails/${item.item_id}/${item.item_name}`}
                            className="item-details-link">  
                          <div className="itemTitle">
                            <h3>{item.item_name}</h3>
                          </div>
                         </Link>
                        <i className="bi bi-heart-fill heart1"></i>
                        <p className="heartCount1">{0}</p>

                        <div className="price-condition">
                          <p></p>
                          <p>&#8369;{item.price}</p>
                          <p>&#x2022; {item.item_condition}</p>
                        </div>
                        
                        <button className="editListButton">EDIT LISTING</button>
                        <button className="soldButton" onClick={handleMarkSold}>MARK SOLD</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p><b>No items found.</b></p>
                )}
              </div>
            </div>
          </div>

          {/* Reviews Tab */}
          <div className="reviews" style={{ display: activeTab === "reviews" ? "block" : "none" }}>
              <h2>Reviews</h2>
              <div className='reviewCard'>
                <div className="profile-reviews">
                  <img src="https://lh3.googleusercontent.com/a/ACg8ocL0ay37DbsBCGDn_jmSQ2eFz3NJoFRlmcAc0gNp0llDGfPAYaY=s1000-p-k-rw-no" alt="Profile Photo" />
                  <p>{"Giancarlo Nonato"}</p>
                  <p>&#x2022;&nbsp;Review from {"buyer"}</p>
                  <p>{"10/30/2025"}</p>
                </div>

                <div className="stars">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </div>

                <div className="review-description">
                  <p>Seller is very friendly and easy to deal with. Hope we can do more transactions again soon.</p>
                </div>

                <hr/>
              </div>

              <div className='reviewCard'>
                <div className="profile-reviews">
                <img src="https://lh3.googleusercontent.com/a-/ALV-UjUWuYwvrpzPj7i5lL5Zcz99CCVQl1zzI9B2cbu2kx1fdjKWSKw=s1000-p-k-rw-no" alt="Profile Photo" />
                <p>{"Jandrik Lana"}</p>
                <p>&#x2022;&nbsp;Review from {"seller"}</p>
                <p>{"09/21/2025"}</p>
                </div>

                <div className="stars">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star"></i>
                </div>

                <div className="review-description">
                  <p>Buyer is very friendly and easy to deal with. To more deals to come.</p>
                </div>

                <hr/>
              </div>
                 
          </div>

          {/* Settings Tab */}
          <div className="settings" style={{ display: activeTab === "details" ? "block" : "none" }}>
              <h2>User Details</h2>
              <div className="settingsCard">
              <table>
                  <tbody>
                    <tr>
                      <td><b>Account Type</b></td>
                      <td>{userData.user_type}</td>
                    </tr>
                    <tr>
                      <td><b>User ID</b></td>
                      <td>{userData.user_id}</td>
                    </tr>
                    <tr>
                      <td><b>Email</b></td>
                      <td>{userData.email}</td>
                    </tr>
                    <tr>
                      <td><b>Department</b></td>
                      <td>{userData.department}</td>
                    </tr>
                    <tr>
                      <td><b>Date Registered</b></td>
                      <td>{userData.regDate}</td>
                    </tr>
                  </tbody>
                </table>
                <br/><hr/>

                {/* (For change password in case implemented)
                <h3>Change Password</h3><br/>
                
                <form action="">
                  <label>Enter Old Password:</label>
                  <div class="password-wrapper">
                      <input type={oldPasswordType} id="password1" placeholder="Old Password" name="oldPass"/>
                      <i id="eyeBtn_1" className={oldPassView} onClick={() => togglePassword("oldPassword")}></i>
                  </div><br/><br/>

                  <label>Enter New Password:</label>
                  <div class="password-wrapper">
                      <input type={newPasswordType} id="password2" placeholder="New Password" name="newPass"/>
                      <i id="eyeBtn2" className={newPassView} onClick={() => togglePassword("newPassword")}></i>
                  </div><br/><br/>

                  <label>Confirm New Password:</label>
                  <div class="password-wrapper">
                      <input type={confirmPasswordType} id="password3" placeholder="Confirm New Password" name="confirmPass"/>
                      <i id="eyeBtn3" className={confirmPassView} onClick={() => togglePassword("confirmPassword")}></i>
                  </div>

                  <center><button>Update</button></center>
                </form>*/}
              </div>
              
          </div>
            <div className="likeditems" style={{ display: activeTab === "liked" ? "block" : "none" }}>

            </div>
        </div>
      </main>
    </>
  );
}

export default MyProfile;
