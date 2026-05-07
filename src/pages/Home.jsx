import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { db } from "../firebase";

import {
  ref,
  onValue
} from "firebase/database";

function Home() {

  const navigate = useNavigate();

  const [userVote, setUserVote] =
    useState(null);

  useEffect(() => {

    const userId =
      localStorage.getItem(
        "kerala_voice_voter"
      );

    if (!userId) return;

    const voteRef =
      ref(db, `votes/${userId}`);

    onValue(voteRef, (snapshot) => {

      const data = snapshot.val();

      if (data) {

        setUserVote(data);

      }

    });

  }, []);

  return (

    <div
      className="min-vh-100 d-flex align-items-center justify-content-center px-2 py-4"
      style={{
        background:
          "linear-gradient(to bottom right,#e9fff2,#ffffff)"
      }}
    >

      <div
        className="card border-0 shadow-lg overflow-hidden"
        style={{
          maxWidth: "550px",
          width: "100%",
          borderRadius: "30px"
        }}
      >

        {/* HEADER */}

        <div
          className="text-center text-white p-4 p-md-5"
          style={{
            background:
              "linear-gradient(135deg,#0f5132,#198754)"
          }}
        >

          {/* LIVE BADGE */}

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

          {/* ICON */}

          <div
            style={{
              fontSize: "60px"
            }}
          >
            🗳️
          </div>

          {/* TITLE */}

          <h1
            className="fw-bold mt-2"
            style={{
              fontSize: "38px"
            }}
          >
            കേരള ജന ശബ്ദം
          </h1>

          <h3
            className="fw-light mt-2"
            style={{
              fontSize: "22px"
            }}
          >
            Kerala People's Voice
          </h3>

          {/* DESCRIPTION */}

          <p
            className="mt-4 mb-2"
            style={{
              fontSize: "17px",
              lineHeight: "1.8"
            }}
          >

            നിങ്ങളുടെ അഭിപ്രായം കേരളത്തിന്റെ
            ഭാവിയെ രൂപപ്പെടുത്തും

          </p>

          <p
            style={{
              opacity: 0.9,
              fontSize: "15px"
            }}
          >

            Your opinion shapes Kerala's future

          </p>

        </div>

        {/* LIVE INFO SECTION */}

        <div className="row text-center g-0">

          <div className="col-4 border-end p-3">

            <h5 className="fw-bold text-success">
              📊
            </h5>

            <small className="fw-bold">
              Live Results
            </small>

          </div>

          <div className="col-4 border-end p-3">

            <h5 className="fw-bold text-primary">
              🏆
            </h5>

            <small className="fw-bold">
              District Trends
            </small>

          </div>

          <div className="col-4 p-3">

            <h5 className="fw-bold text-danger">
              🔥
            </h5>

            <small className="fw-bold">
              Public Mood
            </small>

          </div>

        </div>

        {/* USER STATUS */}

        {

          userVote && (

            <div
              className="mx-4 mt-4 p-3 text-center"
              style={{
                background:
                  "linear-gradient(to right,#fff3cd,#ffe69c)",
                borderRadius: "20px"
              }}
            >

              <h5
                className="fw-bold mb-2"
                style={{
                  color: "#198754"
                }}
              >
                ✅ Your Opinion Submitted
              </h5>

              <div
                style={{
                  fontSize: "15px",
                  lineHeight: "1.7"
                }}
              >

                🏆 {userVote.candidate}

                <br />

                💡 {
                  userVote.opinion ||
                  "No Specific Opinion"
                }

              </div>

            </div>

          )

        }

        {/* BUTTONS */}

        <div className="p-4">

          <button
            className="btn btn-success w-100 py-3 rounded-4 fw-bold fs-5 mb-3 shadow-sm"
            onClick={() => navigate("/vote")}
          >

            {

              userVote
                ? "🗳️ Update My Opinion"
                : "🗳️ Vote Now"

            }

          </button>

          {

            userVote && (

              <button
                className="btn btn-warning w-100 py-3 rounded-4 fw-bold fs-5 mb-3 shadow-sm"
                onClick={() =>
                  navigate("/results", {

                    state: {

                      sharedCandidate:
                        userVote.candidate,

                      sharedReason:
                        userVote.opinion ||
                        "No Specific Opinion",

                      sharedDistrict:
                        userVote.district,

                      shareBadge: `

🗳️ കേരള ജന ശബ്ദം | Kerala People's Voice

🏆 My CM Choice:
${userVote.candidate}

💡 Reason:
${userVote.opinion || "No Specific Opinion"}

📍 District:
${userVote.district}

🔥 I shared my opinion on Kerala's future leadership.

📊 Submit your opinion here:
${window.location.origin}

#KeralaPolitics
#KeralaCM
#KeralaPeoplesVoice

`

                    }

                  })
                }
              >

               🧾 My Opinion

              </button>

            )

          }

          <button
            className="btn btn-dark w-100 py-3 rounded-4 fw-bold fs-5 mb-3 shadow-sm"
            onClick={() => navigate("/results")}
          >

            📊 View Public Opinion

          </button>

          <button
            className="btn btn-primary w-100 py-3 rounded-4 fw-bold fs-5 shadow-sm"
            onClick={() => navigate("/analytics")}
          >

            📈 Detailed Analytics

          </button>

          <button
  className="btn btn-danger w-100 py-3 rounded-4 fw-bold fs-5 mt-3 shadow-sm"
  onClick={async () => {

    try {

      await navigator.share({

        title:
          "Kerala People's Voice",

        text:
          "🗳️ Kerala People's Voice\n\nLive Kerala public opinion platform is now live 🔥\n\nShare your opinion:",

        url:
          "https://kerala-peoples-voice.vercel.app"

      });

    }

    catch (err) {

      console.log(err);

    }

  }}
>

  🔗 Share Link

</button>

<button
  className="btn btn-secondary w-100 py-3 rounded-4 fw-bold fs-5 mt-3 shadow-sm"
  onClick={() => navigate("/help")}
>

  ❓ Help & About

</button>

        </div>

        {/* FOOTER */}

        <div
          className="text-center px-4 pb-4 text-muted"
          style={{
            fontSize: "14px"
          }}
        >

          <p className="mb-2">

            Independent Public Opinion Platform

          </p>

          <small>

            This platform is not affiliated with any political party.

          </small>

        </div>

      </div>

    </div>

  );

}

export default Home;