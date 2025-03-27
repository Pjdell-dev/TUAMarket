import React, { useState } from "react";
import "./MyProfile.css";

function MyProfile() {
  const [activeTab, setActiveTab] = useState("myListings");
  const [searchQuery, setSearchQuery] = useState("");

  const items = [
    { id: 1, title: "ITEM #1", price: 600, condition: "Like New" },
    { id: 2, title: "ITEM #2", price: 600, condition: "Like New" },
    { id: 3, title: "ITEM #3", price: 600, condition: "Like New" },
    { id: 4, title: "ITEM #4", price: 600, condition: "Like New" },
    { id: 5, title: "ITEM #5", price: 600, condition: "Like New" },
    { id: 6, title: "ITEM #6", price: 600, condition: "Like New" },
    { id: 7, title: "ITEM #7", price: 600, condition: "Like New" },
    { id: 8, title: "ITEM #8", price: 600, condition: "Like New" },
  ];

  // Filter items based on search input
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <main>
        <div className="profile-container">
          <div className="profile-nameBox">
            <div className="profile-coverBG"></div>
            <div className="profile-pic">
              <img src="https://lh3.googleusercontent.com/a-/ALV-UjWINyPoMWaXdtmYTSbahawn8qSdguuctzGyJ_9Fq-v1i9If0No1=s1000-p" alt="Profile" />
            </div>
            <div className="profile-name">
              <h1>Elisha Marie Vea Daliba</h1>
              <p>elishamarieveapdaliba@tua.edu.ph</p>
              <div className="rating-container">
                <span id="starReview">
                  <i className="bi bi-star-fill"></i>
                </span>
                <p className="rating-score">5.0</p>
              </div>
            </div>
          </div>

          <div className="profile-tabs">
            <div className="navMenu">
              <a href="#myListings" onClick={() => setActiveTab("myListings")}>
                My Listings
              </a>
              <a href="#reviews" onClick={() => setActiveTab("reviews")}>
                Reviews
              </a>
              <a href="#settings" onClick={() => setActiveTab("settings")}>
                Settings
              </a>
            </div>
          </div>

          {/* Listings Tab */}
          <div className="myListings" style={{ display: activeTab === "myListings" ? "block" : "none" }}>
            <div className="listingCard">
              <h2>User's Listings</h2>
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
                    <div className="itemCard" key={item.id}>
                      <img
                        src="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/objects.png"
                        style={{
                          width: "180px",
                          height: "180px",
                          border: "3px solid green",
                          borderRadius: "12px",
                          alignItems: "center",
                        }}
                        alt="Item"
                      />
                      <div className="itemDeets">
                        <div className="itemTitle">
                          <h3>{item.title}</h3>
                        </div>
                        <p>&#8369;{item.price}.00</p>
                        <i className="bi bi-heart-fill heart"></i>
                        <p><b>0</b></p>
                        <p>&#x2022; {item.condition}</p>
                        <button className="editListButton">EDIT LISTING</button>
                        <button className="soldButton">MARK SOLD</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No items found.</p>
                )}
              </div>
            </div>
          </div>

          {/* Reviews Tab */}
          <div className="reviews" style={{ display: activeTab === "reviews" ? "block" : "none" }}>
            <div>REVIEWS</div>
          </div>

          {/* Settings Tab */}
          <div className="settings" style={{ display: activeTab === "settings" ? "block" : "none" }}>
            <div>SETTINGS</div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MyProfile;
