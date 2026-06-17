import { useState, useEffect } from "react";

import {
  getTotalOpportunities,
  getRemoteCount,
  getUpcomingCount,
} from "./lib/helpers";

function saveOpportunities(opportunities) {
  localStorage.setItem("fitclasses_opps", JSON.stringify(opportunities));
}

function loadOpportunities() {
  var saved = localStorage.getItem("fitclasses_opps");
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
}

var CLASS_TYPES = [
  "All Types",
  "Yoga",
  "Pilates",
  "HIIT",
  "Strength Training",
  "Cardio",
  "Zumba",
  "Dance Fitness",
  "CrossFit",
  "Stretching",
  "Kids Fitness",
  "Senior Fitness",
  "Other",
];

function Header({ total, remote, upcoming }) {
  return (
    <header
      style={{
        backgroundColor: "#E05C2A",
        color: "white",
        padding: "20px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      <div>
        <h1 style={{ margin: 0, fontSize: "24px" }}>
          🏋️ Fit Classes Volunteer Hub
        </h1>
        <p style={{ margin: "4px 0 0", fontSize: "14px", opacity: 0.9 }}>
          Find and post fitness volunteer opportunities
        </p>
      </div>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <div
          style={{
            backgroundColor: "white",
            color: "#E05C2A",
            borderRadius: "8px",
            padding: "8px 16px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "11px", marginBottom: "2px" }}>
            Total Classes
          </div>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>{total}</div>
        </div>
        <div
          style={{
            backgroundColor: "white",
            color: "#185FA5",
            borderRadius: "8px",
            padding: "8px 16px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "11px", marginBottom: "2px" }}>Virtual</div>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>{remote}</div>
        </div>
        <div
          style={{
            backgroundColor: "white",
            color: "#1D9E75",
            borderRadius: "8px",
            padding: "8px 16px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "11px", marginBottom: "2px" }}>
            My Upcoming
          </div>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>{upcoming}</div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #ddd",
        marginTop: "40px",
        padding: "20px",
        textAlign: "center",
        fontSize: "13px",
        color: "#888",
      }}
    >
      Fit Classes Volunteer Hub · Data from{" "}
      <a
        href="https://www.volunteerconnector.org"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#E05C2A" }}
      >
        Volunteer Connector
      </a>
    </footer>
  );
}

function OpportunityCard({ opportunity, isMyOpportunity, onDelete }) {
  // The API returns some fields as objects, so we extract the name safely
  var rawTitle = opportunity.title || opportunity.opportunity_title || "";
  var title =
    typeof rawTitle === "object"
      ? rawTitle.name || "Untitled Class"
      : rawTitle || "Untitled Class";

  var rawOrg = opportunity.organization || opportunity.organisation_name || "";
  var org =
    typeof rawOrg === "object"
      ? rawOrg.name || "Unknown Organization"
      : rawOrg || "Unknown Organization";

  var rawDesc = opportunity.description || opportunity.summary || "";
  var description =
    typeof rawDesc === "object"
      ? rawDesc.name || "No description available."
      : rawDesc || "No description available.";

  var rawLocation = opportunity.location || opportunity.city || "";
  var location =
    typeof rawLocation === "object"
      ? rawLocation.name || "Location not listed"
      : rawLocation || "Location not listed";

  var rawDate = opportunity.date || opportunity.start_date || "";
  var date = typeof rawDate === "object" ? "" : rawDate;

  var rawCategory = opportunity.category || "";
  var category =
    typeof rawCategory === "object"
      ? rawCategory.name || "Fitness"
      : rawCategory || "Fitness";

  var isVirtual = opportunity.isRemote === true || opportunity.online === true;

  var shortDescription = description;
  if (description.length > 150) {
    shortDescription = description.slice(0, 150) + "...";
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "8px",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "16px", color: "#111" }}>{title}</h3>
        <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
          {isMyOpportunity && (
            <span
              style={{
                fontSize: "11px",
                padding: "2px 8px",
                borderRadius: "99px",
                backgroundColor: "#FAECE7",
                color: "#993C1D",
                fontWeight: "bold",
              }}
            >
              My Class
            </span>
          )}
          {isVirtual && (
            <span
              style={{
                fontSize: "11px",
                padding: "2px 8px",
                borderRadius: "99px",
                backgroundColor: "#E6F1FB",
                color: "#185FA5",
                fontWeight: "bold",
              }}
            >
              Virtual
            </span>
          )}
        </div>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: "13px",
          color: "#E05C2A",
          fontWeight: "bold",
        }}
      >
        {org}
      </p>
      <p
        style={{
          margin: 0,
          fontSize: "14px",
          color: "#555",
          lineHeight: "1.5",
        }}
      >
        {shortDescription}
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          marginTop: "4px",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            backgroundColor: "#f5f5f5",
            color: "#666",
            padding: "2px 8px",
            borderRadius: "6px",
          }}
        >
          🏃 {category}
        </span>
        <span
          style={{
            fontSize: "12px",
            backgroundColor: "#f5f5f5",
            color: "#666",
            padding: "2px 8px",
            borderRadius: "6px",
          }}
        >
          📍 {location}
        </span>
        {date && (
          <span
            style={{
              fontSize: "12px",
              backgroundColor: "#f5f5f5",
              color: "#666",
              padding: "2px 8px",
              borderRadius: "6px",
            }}
          >
            📅 {date}
          </span>
        )}
      </div>
      {isMyOpportunity && (
        <button
          onClick={function () {
            onDelete(opportunity.id);
          }}
          style={{
            alignSelf: "flex-end",
            marginTop: "4px",
            backgroundColor: "transparent",
            border: "1px solid #f99",
            color: "#cc0000",
            borderRadius: "6px",
            padding: "4px 12px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
}

function OpportunityList({
  opportunities,
  isMyOpportunities,
  onDelete,
  emptyMessage,
}) {
  if (opportunities.length === 0) {
    return (
      <p
        style={{
          textAlign: "center",
          color: "#888",
          padding: "40px",
          fontSize: "14px",
        }}
      >
        {emptyMessage}
      </p>
    );
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "16px",
      }}
    >
      {opportunities.map(function (opp, index) {
        return (
          <OpportunityCard
            key={opp.id || index}
            opportunity={opp}
            isMyOpportunity={isMyOpportunities}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
}

function AddOpportunityForm({ onAdd }) {
  var [isOpen, setIsOpen] = useState(false);
  var [title, setTitle] = useState("");
  var [organization, setOrganization] = useState("");
  var [description, setDescription] = useState("");
  var [location, setLocation] = useState("");
  var [date, setDate] = useState("");
  var [category, setCategory] = useState("Yoga");
  var [isRemote, setIsRemote] = useState(false);
  var [errorMessage, setErrorMessage] = useState("");

  function handleSubmit() {
    if (title === "" || organization === "") {
      setErrorMessage("Please fill in the class name and organization.");
      return;
    }
    var newOpportunity = {
      id: "my-" + Date.now(),
      title: title,
      organization: organization,
      description: description,
      location: location,
      date: date,
      category: category,
      isRemote: isRemote,
    };
    onAdd(newOpportunity);
    setTitle("");
    setOrganization("");
    setDescription("");
    setLocation("");
    setDate("");
    setCategory("Yoga");
    setIsRemote(false);
    setErrorMessage("");
    setIsOpen(false);
  }

  var inputStyle = {
    width: "100%",
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    boxSizing: "border-box",
  };

  if (!isOpen) {
    return (
      <button
        onClick={function () {
          setIsOpen(true);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          color: "#E05C2A",
          border: "1px solid #E05C2A",
          backgroundColor: "transparent",
          borderRadius: "6px",
          padding: "8px 16px",
          fontSize: "14px",
          fontWeight: "bold",
          cursor: "pointer",
          marginBottom: "16px",
        }}
      >
        + Add a Fit Class Opportunity
      </button>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <h2 style={{ margin: "0 0 16px", fontSize: "18px" }}>
        Add a New Fit Class
      </h2>
      {errorMessage && (
        <p style={{ color: "red", fontSize: "13px", marginBottom: "12px" }}>
          {errorMessage}
        </p>
      )}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
      >
        <div>
          <label
            style={{
              fontSize: "12px",
              color: "#666",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Class Name *
          </label>
          <input
            style={inputStyle}
            value={title}
            onChange={function (e) {
              setTitle(e.target.value);
            }}
            placeholder="e.g. Morning Yoga Flow"
          />
        </div>
        <div>
          <label
            style={{
              fontSize: "12px",
              color: "#666",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Organization *
          </label>
          <input
            style={inputStyle}
            value={organization}
            onChange={function (e) {
              setOrganization(e.target.value);
            }}
            placeholder="Gym or studio name"
          />
        </div>
        <div>
          <label
            style={{
              fontSize: "12px",
              color: "#666",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Location
          </label>
          <input
            style={inputStyle}
            value={location}
            onChange={function (e) {
              setLocation(e.target.value);
            }}
            placeholder="Address or Virtual"
          />
        </div>
        <div>
          <label
            style={{
              fontSize: "12px",
              color: "#666",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Date
          </label>
          <input
            style={inputStyle}
            type="date"
            value={date}
            onChange={function (e) {
              setDate(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            style={{
              fontSize: "12px",
              color: "#666",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Class Type
          </label>
          <select
            style={inputStyle}
            value={category}
            onChange={function (e) {
              setCategory(e.target.value);
            }}
          >
            {CLASS_TYPES.slice(1).map(function (type) {
              return (
                <option key={type} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            paddingTop: "20px",
          }}
        >
          <input
            type="checkbox"
            id="virtual-checkbox"
            checked={isRemote}
            onChange={function (e) {
              setIsRemote(e.target.checked);
            }}
            style={{ width: "16px", height: "16px" }}
          />
          <label
            htmlFor="virtual-checkbox"
            style={{ fontSize: "14px", cursor: "pointer" }}
          >
            Virtual / Online class
          </label>
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label
            style={{
              fontSize: "12px",
              color: "#666",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Description
          </label>
          <textarea
            style={{ ...inputStyle, resize: "vertical" }}
            rows={3}
            value={description}
            onChange={function (e) {
              setDescription(e.target.value);
            }}
            placeholder="Describe the class, fitness level, what to bring..."
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px",
          marginTop: "16px",
        }}
      >
        <button
          onClick={function () {
            setIsOpen(false);
            setErrorMessage("");
          }}
          style={{
            background: "none",
            border: "none",
            color: "#888",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: "#E05C2A",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "8px 20px",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Save Class
        </button>
      </div>
    </div>
  );
}

function MyOpportunities({ myOpportunities, onDelete, onAdd }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>
        My Fit Class Opportunities ({myOpportunities.length})
      </h2>
      <AddOpportunityForm onAdd={onAdd} />
      <OpportunityList
        opportunities={myOpportunities}
        isMyOpportunities={true}
        onDelete={onDelete}
        emptyMessage="You haven't added any classes yet. Click the button above to add one!"
      />
    </div>
  );
}

export default function VolunteerDashboard() {
  var [apiOpportunities, setApiOpportunities] = useState([]);
  var [myOpportunities, setMyOpportunities] = useState(loadOpportunities());
  var [loading, setLoading] = useState(true);
  var [errorMessage, setErrorMessage] = useState("");
  var [searchQuery, setSearchQuery] = useState("");
  var [selectedCategory, setSelectedCategory] = useState("All Types");
  var [activeTab, setActiveTab] = useState("browse");

  useEffect(
    function () {
      setLoading(true);
      setErrorMessage("");
      var url =
        "https://www.volunteerconnector.org/api/search/?search=" +
        (searchQuery || "fitness classes health exercise yoga") +
        "&limit=50";
      fetch(url)
        .then(function (response) {
          if (!response.ok) {
            throw new Error("API request failed");
          }
          return response.json();
        })
        .then(function (data) {
          var results = [];
          if (Array.isArray(data)) {
            results = data;
          } else if (data.results) {
            results = data.results;
          }
          setApiOpportunities(results);
          setLoading(false);
        })
        .catch(function () {
          setErrorMessage("Unable to load volunteer opportunities.");
          setLoading(false);
        });
    },
    [searchQuery],
  );

  useEffect(
    function () {
      saveOpportunities(myOpportunities);
    },
    [myOpportunities],
  );

  function handleAdd(newOpportunity) {
    var updated = [newOpportunity].concat(myOpportunities);
    setMyOpportunities(updated);
  }

  function handleDelete(id) {
    var updated = myOpportunities.filter(function (opp) {
      return opp.id !== id;
    });
    setMyOpportunities(updated);
  }

  // Keywords that indicate a fitness-related opportunity
  var fitnessKeywords = [
    "fitness",
    "yoga",
    "pilates",
    "hiit",
    "cardio",
    "gym",
    "exercise",
    "workout",
    "zumba",
    "dance",
    "crossfit",
    "strength",
    "cycling",
    "spin",
    "barre",
    "health",
    "wellness",
    "sport",
    "athletic",
    "training",
    "class",
    "stretching",
    "aerobic",
    "martial arts",
    "swimming",
    "active",
    "movement",
  ];

  var filteredApiOpps = apiOpportunities.filter(function (opp) {
    var rawTitle = opp.title || opp.opportunity_title || "";
    var title = String(
      typeof rawTitle === "object" ? rawTitle.name || "" : rawTitle,
    ).toLowerCase();

    var rawOrg = opp.organization || opp.organisation_name || "";
    var org = String(
      typeof rawOrg === "object" ? rawOrg.name || "" : rawOrg,
    ).toLowerCase();

    var rawDesc = opp.description || opp.summary || "";
    var desc = String(
      typeof rawDesc === "object" ? rawDesc.name || "" : rawDesc,
    ).toLowerCase();

    var rawCategory = opp.category || "";
    var cat = String(
      typeof rawCategory === "object" ? rawCategory.name || "" : rawCategory,
    ).toLowerCase();

    // Only show if it matches a fitness keyword
    var isFitness = fitnessKeywords.some(function (keyword) {
      return (
        title.includes(keyword) ||
        desc.includes(keyword) ||
        cat.includes(keyword) ||
        org.includes(keyword)
      );
    });

    // Also apply the user's search and category filter
    var query = searchQuery.toLowerCase();
    var matchesSearch =
      !query ||
      title.includes(query) ||
      org.includes(query) ||
      desc.includes(query);
    var matchesCategory =
      selectedCategory === "All Types" ||
      cat === selectedCategory.toLowerCase();

    return isFitness && matchesSearch && matchesCategory;
  });

  var filteredMyOpps = myOpportunities.filter(function (opp) {
    var title = String(opp.title || "").toLowerCase();
    var org = String(opp.organization || "").toLowerCase();
    var query = searchQuery.toLowerCase();
    var matchesSearch = title.includes(query) || org.includes(query);
    var matchesCategory =
      selectedCategory === "All Types" ||
      String(opp.category || "").toLowerCase() ===
        selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  var total = getTotalOpportunities(apiOpportunities, myOpportunities);
  var remoteCount = getRemoteCount(apiOpportunities, myOpportunities);
  var upcomingCount = getUpcomingCount(myOpportunities);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fafafa",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <Header total={total} remote={remoteCount} upcoming={upcomingCount} />
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px" }}>
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Search fit classes..."
            value={searchQuery}
            onChange={function (e) {
              setSearchQuery(e.target.value);
            }}
            style={{
              flex: "1 1 200px",
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          />
          <select
            value={selectedCategory}
            onChange={function (e) {
              setSelectedCategory(e.target.value);
            }}
            style={{
              flex: "0 1 180px",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          >
            {CLASS_TYPES.map(function (type) {
              return (
                <option key={type} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
        </div>

        <div
          style={{
            display: "flex",
            borderBottom: "2px solid #eee",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={function () {
              setActiveTab("browse");
            }}
            style={{
              padding: "10px 20px",
              border: "none",
              background: "none",
              fontSize: "14px",
              fontWeight: activeTab === "browse" ? "bold" : "normal",
              color: activeTab === "browse" ? "#E05C2A" : "#888",
              borderBottom:
                activeTab === "browse"
                  ? "2px solid #E05C2A"
                  : "2px solid transparent",
              cursor: "pointer",
              marginBottom: "-2px",
            }}
          >
            Browse Classes
          </button>
          <button
            onClick={function () {
              setActiveTab("mine");
            }}
            style={{
              padding: "10px 20px",
              border: "none",
              background: "none",
              fontSize: "14px",
              fontWeight: activeTab === "mine" ? "bold" : "normal",
              color: activeTab === "mine" ? "#E05C2A" : "#888",
              borderBottom:
                activeTab === "mine"
                  ? "2px solid #E05C2A"
                  : "2px solid transparent",
              cursor: "pointer",
              marginBottom: "-2px",
            }}
          >
            My Classes ({myOpportunities.length})
          </button>
        </div>

        {activeTab === "browse" && (
          <div>
            {loading && (
              <p
                style={{ textAlign: "center", color: "#888", padding: "40px" }}
              >
                Loading Opportunities...
              </p>
            )}
            {!loading && errorMessage && (
              <p style={{ textAlign: "center", color: "red", padding: "40px" }}>
                Unable to load volunteer opportunities
              </p>
            )}
            {!loading && !errorMessage && (
              <div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#888",
                    marginBottom: "16px",
                  }}
                >
                  Showing {filteredApiOpps.length} result(s) from Volunteer
                  Connector
                </p>
                <OpportunityList
                  opportunities={filteredApiOpps}
                  isMyOpportunities={false}
                  onDelete={function () {}}
                  emptyMessage="No classes found. Try a different search term."
                />
              </div>
            )}
          </div>
        )}

        {activeTab === "mine" && (
          <MyOpportunities
            myOpportunities={filteredMyOpps}
            onDelete={handleDelete}
            onAdd={handleAdd}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
