import { useEffect, useState } from "react";

import { db } from "../firebase";

import {
  ref,
  set,
  onValue
} from "firebase/database";

import { useNavigate } from "react-router-dom";

function Vote() {

  const navigate = useNavigate();

  const [candidate, setCandidate] = useState("");
  const [district, setDistrict] = useState("");
  const [opinion, setOpinion] = useState("");

  const [alreadyVoted, setAlreadyVoted] =
    useState(false);

  const districts = [

    "Thiruvananthapuram",
    "Kollam",
    "Pathanamthitta",
    "Alappuzha",
    "Kottayam",
    "Idukki",
    "Ernakulam",
    "Thrissur",
    "Palakkad",
    "Malappuram",
    "Kozhikode",
    "Wayanad",
    "Kannur",
    "Kasaragod"

  ];

  const candidates = [

    "VD Satheesan",
    "Ramesh Chennithala",
    "KC Venugopal",
    "No Opinion"

  ];

  const reasons = [

    "Development / വികസനം",
    "Jobs / ജോലി അവസരങ്ങൾ",
    "Education / വിദ്യാഭ്യാസം",
    "Healthcare / ആരോഗ്യ പരിപാലനം",
    "Anti-Corruption / അഴിമതി വിരുദ്ധ നിലപാട്",
    "Youth Leadership / യുവ നേതൃത്വം",
    "Experience / അനുഭവ സമ്പത്ത്",
    "Infrastructure / അടിസ്ഥാന സൗകര്യ വികസനം",
    "Administrative Skill / ഭരണ കഴിവ്",
    "Digital Kerala / ഡിജിറ്റൽ കേരളം",
    "Honesty / സത്യസന്ധത",
    "Good Speaker / നല്ല പ്രസംഗകൻ",
    "Strong Leadership / ശക്തമായ നേതൃത്വം",
    "Public Support / ജനപിന്തുണ",
    "Better Governance / മികച്ച ഭരണ സംവിധാനം",
    "Farmer Support / കർഷക പിന്തുണ",
    "Women Safety / വനിതാ സുരക്ഷ",
    "Road Development / റോഡ് വികസനം",
    "Business Growth / വ്യാപാര വളർച്ച",
    "Tourism Development / ടൂറിസം വികസനം",
    "Welfare Schemes / ക്ഷേമ പദ്ധതികൾ",
    "Employment Opportunities / തൊഴിൽ അവസരങ്ങൾ",
    "Modern Thinking / ആധുനിക ചിന്ത",
    "Social Justice / സാമൂഹ്യ നീതി",
    "Political Experience / രാഷ്ട്രീയ പരിചയം",
    "People Friendly / ജന സൗഹൃദ സമീപനം",
    "Financial Management / സാമ്പത്തിക നിയന്ത്രണം",
    "Law and Order / നിയമവും ക്രമവും",
    "Environmental Protection / പരിസ്ഥിതി സംരക്ഷണം",
    "Student Support / വിദ്യാർത്ഥി പിന്തുണ",
    "Technology Vision / സാങ്കേതിക ദൂരദർശനം"

  ];

  useEffect(() => {

    let userId =
      localStorage.getItem("kerala_voice_voter");

    if (!userId) {

      userId = crypto.randomUUID();

      localStorage.setItem(
        "kerala_voice_voter",
        userId
      );

    }

    const voteRef =
      ref(db, `votes/${userId}`);

    onValue(voteRef, (snapshot) => {

      const data = snapshot.val();

      if (data) {

        setCandidate(data.candidate || "");
        setDistrict(data.district || "");
        setOpinion(data.opinion || "");

        setAlreadyVoted(true);

      }

    });

  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const userId =
        localStorage.getItem(
          "kerala_voice_voter"
        );

      await set(
        ref(db, `votes/${userId}`),
        {

          candidate,
          district,

          opinion:
            candidate === "No Opinion"
              ? ""
              : opinion,

          updatedAt:
            new Date().toISOString(),

        }
      );

      const shareBadge = `
🗳️ കേരള ജന ശബ്ദം | Kerala People's Voice

🏆 My CM Choice:
${candidate}

💡 Reason:
${candidate === "No Opinion"
  ? "No Specific Opinion"
  : opinion
}

📍 District:
${district}

🔥 I shared my opinion on Kerala's future leadership.

📊 Submit your opinion here:
${window.location.origin}

#KeralaPolitics
#KeralaCM
#KeralaPeoplesVoice
`;

      alert(

        alreadyVoted
          ? "Opinion Updated Successfully"
          : "Opinion Submitted Successfully"

      );

      navigate("/results", {

        state: {

          sharedCandidate: candidate,

          sharedReason:
            candidate === "No Opinion"
              ? "No Specific Opinion"
              : opinion,

          sharedDistrict: district,

          shareBadge

        }

      });

    }

    catch (error) {

      console.log(error);

      alert(
        "Error submitting opinion"
      );

    }

  };

  return (

    <div
      className="container-fluid px-2 px-md-4 py-4 min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background:
          "linear-gradient(to bottom right,#eafff1,#ffffff)"
      }}
    >

      <div
        className="card shadow-lg border-0 p-3 p-md-5"
        style={{
          maxWidth: "700px",
          width: "100%",
          borderRadius: "30px"
        }}
      >

        {/* HEADER */}

        <div className="text-center mb-4">

          <div className="mb-3">

            <span
              className="badge rounded-pill px-4 py-2"
              style={{
                background: "#dc3545",
                fontSize: "14px"
              }}
            >
              🔴 LIVE PUBLIC OPINION
            </span>

          </div>

          <div
            style={{
              fontSize: "60px"
            }}
          >
            🗳️
          </div>

          <h1
            className="fw-bold display-6"
            style={{
              color: "#006400"
            }}
          >
            കേരള ജനാഭിപ്രായം
          </h1>

          <h3 className="fw-semibold">

            Kerala Public Opinion

          </h3>

          <p className="text-muted mt-3">

            Share your opinion about Kerala's future leadership

          </p>

        </div>

        {/* ALERT */}

        {

          alreadyVoted && (

            <div className="alert alert-info border-0 rounded-4 shadow-sm mb-4">

              <strong>

                You already submitted your opinion.

              </strong>

              <br />

              You can update your decision anytime.

            </div>

          )

        }

        {/* FORM */}

        <form onSubmit={handleSubmit}>

          {/* CANDIDATE */}

          <div className="mb-4">

            <label className="form-label fw-bold fs-5">

              🧑 Candidate / സ്ഥാനാർത്ഥി

            </label>

            <select
              className="form-select form-select-lg rounded-4"
              value={candidate}
              onChange={(e) => {

                setCandidate(
                  e.target.value
                );

                if (
                  e.target.value === "No Opinion"
                ) {

                  setOpinion("");

                }

              }}
              required
            >

              <option value="">
                Select Candidate
              </option>

              {

                candidates.map(
                  (item, index) => (

                    <option
                      key={index}
                      value={item}
                    >
                      {item}
                    </option>

                  )
                )

              }

            </select>

          </div>

          {/* DISTRICT */}

          <div className="mb-4">

            <label className="form-label fw-bold fs-5">

              📍 District / ജില്ല

            </label>

            <select
              className="form-select form-select-lg rounded-4"
              value={district}
              onChange={(e) =>
                setDistrict(
                  e.target.value
                )
              }
              required
            >

              <option value="">
                Select District
              </option>

              {

                districts.map(
                  (item, index) => (

                    <option
                      key={index}
                      value={item}
                    >
                      {item}
                    </option>

                  )
                )

              }

            </select>

          </div>

          {/* REASON */}

          {

            candidate !== "No Opinion" && (

              <div className="mb-4">

                <label className="form-label fw-bold fs-5">

                  💡 Why did you choose this leader?

                </label>

                <small className="text-muted d-block mb-2">

                  ഈ നേതാവിനെ തിരഞ്ഞെടുക്കാൻ കാരണം

                </small>

                <select
                  className="form-select form-select-lg rounded-4"
                  value={opinion}
                  onChange={(e) =>
                    setOpinion(
                      e.target.value
                    )
                  }
                  required={
                    candidate !== "No Opinion"
                  }
                >

                  <option value="">
                    Select Reason
                  </option>

                  {

                    reasons.map(
                      (item, index) => (

                        <option
                          key={index}
                          value={item}
                        >
                          {item}
                        </option>

                      )
                    )

                  }

                </select>

              </div>

            )

          }

          {/* SUBMIT */}

          <button
            className="btn btn-success w-100 py-3 rounded-4 fw-bold fs-5 shadow-sm"
          >

            {

              alreadyVoted
                ? "🗳️ Update Opinion"
                : "✅ Submit Opinion"

            }

          </button>

        </form>

        {/* FOOTER BUTTONS */}

        <div className="d-grid gap-3 mt-4">

          <button
            className="btn btn-dark py-3 rounded-4 fw-bold fs-5"
            onClick={() =>
              navigate("/results")
            }
          >

            📊 View Live Results

          </button>

          <button
            className="btn btn-primary py-3 rounded-4 fw-bold fs-5"
            onClick={() =>
              navigate("/analytics")
            }
          >

            📈 Detailed Analytics

          </button>

          <button
            className="btn btn-outline-secondary py-2 rounded-4"
            onClick={() =>
              navigate("/")
            }
          >

            🏠 Back to Home

          </button>

        </div>

        {/* FOOTER */}

        <div className="text-center mt-4 text-muted">

          <small>

            Independent Public Opinion Platform

          </small>

        </div>

      </div>

    </div>

  );

}

export default Vote;