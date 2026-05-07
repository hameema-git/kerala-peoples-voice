import { useEffect, useState, useRef } from "react";

import { db } from "../firebase";

import {
  ref,
  onValue
} from "firebase/database";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

import html2canvas from "html2canvas";

function Results() {

  const [votes, setVotes] = useState([]);

  const navigate = useNavigate();

  const location = useLocation();

  const shareData = location.state;

  const cardRef = useRef();

  const voterId =
    localStorage.getItem("kerala_voice_voter");

  const hasVoted = !!voterId;

  useEffect(() => {

    const votesRef = ref(db, "votes");

    onValue(votesRef, (snapshot) => {

      const data = snapshot.val();

      if (data) {

        setVotes(
          Object.values(data)
        );

      }

    });

  }, []);

  const totalVotes = votes.length;

  const candidateCounts = {};

  votes.forEach((vote) => {

    candidateCounts[vote.candidate] =
      (candidateCounts[vote.candidate] || 0) + 1;

  });

  const leadingCandidate =
    Object.entries(candidateCounts)
      .sort((a, b) => b[1] - a[1])[0];

  const downloadCard = async () => {

    const canvas =
      await html2canvas(
        cardRef.current,
        {
          scale: 2
        }
      );

    const image =
      canvas.toDataURL("image/png");

    const link =
      document.createElement("a");

    link.href = image;

    link.download =
      "kerala-peoples-voice.png";

    link.click();

  };

  const shareCard = async () => {

    try {

      await navigator.share({

        title:
          "Kerala People's Voice",

        text:
          "Share your opinion now",

        url:
          window.location.origin

      });

    }

    catch (err) {

      console.log(err);

    }

  };

  return (

    <div
      className="container-fluid py-3 px-2"
      style={{
        background:
          "linear-gradient(to bottom,#ecfff2,#ffffff)",
        minHeight: "100vh"
      }}
    >

      <div className="row justify-content-center">

        <div className="col-lg-7">

          <div
            className="card border-0 shadow-lg"
            style={{
              borderRadius: "30px"
            }}
          >

            <div className="card-body p-3 p-md-4">

              {/* HEADER */}

              <div className="text-center mb-4">

                <span
                  className="badge rounded-pill px-4 py-2 mb-3"
                  style={{
                    background: "#dc3545",
                    fontSize: "13px"
                  }}
                >
                  🔴 LIVE PUBLIC OPINION
                </span>

                <h1
                  className="fw-bold"
                  style={{
                    color: "#006400"
                  }}
                >
                  നിലവിലെ ജനാഭിപ്രായം
                </h1>

                <h3 className="fw-semibold">

                  Current Public Opinion

                </h3>

              </div>

              {/* TOTAL */}

              <div
                className="card border-0 text-white mb-4"
                style={{
                  background:
                    "linear-gradient(to right,#198754,#20c997)",
                  borderRadius: "25px"
                }}
              >

                <div className="card-body text-center">

                  <h1 className="fw-bold">

                    {totalVotes}

                  </h1>

                  <h4>

                    Total Public Opinions

                  </h4>

                </div>

              </div>

              {/* LEADER */}

              {

                leadingCandidate && (

                  <div
                    className="card border-0 shadow mb-4"
                    style={{
                      borderRadius: "25px",
                      background:
                        "linear-gradient(to right,#fff3cd,#ffe69c)"
                    }}
                  >

                    <div className="card-body text-center">

                      <h5 className="fw-bold">

                        🏆 Current Leading Candidate

                      </h5>

                      <h2
                        className="fw-bold mt-3"
                        style={{
                          color: "#198754"
                        }}
                      >

                        {leadingCandidate[0]}

                      </h2>

                      <h4>

                        {

                          (
                            (
                              leadingCandidate[1] /
                              totalVotes
                            ) * 100
                          ).toFixed(1)

                        }%

                      </h4>

                    </div>

                  </div>

                )

              }
{/* SHARE CARD */}

{
  shareData && (

    <div
      ref={cardRef}
      className="mb-4 mx-auto"
      style={{
        maxWidth: "950px",
        width: "100%",
        borderRadius: "30px",
        overflow: "hidden",
        background:
          "linear-gradient(135deg,#07121c,#14532d,#198754)",
        boxShadow:
          "0 15px 40px rgba(0,0,0,0.25)"
      }}
    >

      <div className="p-3 p-md-4">

        {/* TOP */}

        <div className="text-center text-white mb-3">

          <div
            style={{
              fontSize: "42px"
            }}
          >
            🎉
          </div>

          <h1
            className="fw-bold mb-1"
            style={{
              fontSize: "34px"
            }}
          >
            Opinion Submitted
          </h1>

          <p
            className="mb-0"
            style={{
              opacity: 0.9,
              fontSize: "16px"
            }}
          >
            Kerala People's Voice
          </p>

        </div>

        {/* WHITE CARD */}

        <div
          className="bg-white p-3"
          style={{
            borderRadius: "25px"
          }}
        >

          <div className="row align-items-center">

            {/* LEFT SIDE */}

            <div className="col-md-4 text-center">

              <div
                style={{
                  fontSize: "48px"
                }}
              >
                🏆
              </div>

              <h1
                className="fw-bold mt-2"
                style={{
                  color: "#198754",
                  fontSize: "30px",
                  lineHeight: "1.3"
                }}
              >
                {shareData.sharedCandidate}
              </h1>

            </div>

            {/* RIGHT SIDE */}

            <div className="col-md-8">

              <div
                className="p-3 mt-2 mt-md-0"
                style={{
                  background:
                    "linear-gradient(to right,#f4fff7,#ecfff4)",
                  borderRadius: "20px"
                }}
              >

                <div
                  className="fw-bold text-success mb-2"
                  style={{
                    fontSize: "18px"
                  }}
                >
                  💡 Reason For Support
                </div>

                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#222",
                    lineHeight: "1.5"
                  }}
                >
                  {shareData.sharedReason}
                </div>

              </div>

              {

                shareData.sharedExtraOpinion && (

                  <div
                    className="mt-3"
                    style={{
                      fontSize: "15px",
                      lineHeight: "1.6",
                      color: "#444"
                    }}
                  >
                    “{shareData.sharedExtraOpinion}”
                  </div>

                )

              }

            </div>

          </div>

          {/* FOOTER */}

          <div className="text-center mt-3">

            <h3
              className="fw-bold mb-1"
              style={{
                color: "#dc3545",
                fontSize: "24px"
              }}
            >
              🔴 കേരള ജന ശബ്ദം
            </h3>

            <p
              className="mb-2"
              style={{
                color: "#555",
                fontSize: "15px"
              }}
            >
              Share your opinion now ✨
            </p>

            <div
              className="mx-auto"
              style={{
                maxWidth: "500px",
                background:
                  "linear-gradient(to right,#198754,#20c997)",
                color: "white",
                borderRadius: "18px",
                padding: "10px",
                fontWeight: "bold",
                fontSize: "14px",
                lineHeight: "1.5"
              }}
            >

              Vote Here 👇

              <br />

              {window.location.origin}

            </div>

          </div>

        </div>

      </div>

    </div>

  )
}
  
              {/* ACTION BUTTONS */}

              <div className="d-grid gap-3">

                {

                  shareData && (

                    <>

                      <button
                        className="btn btn-warning py-3 rounded-4 fw-bold fs-5"
                        onClick={shareCard}
                      >

                        📤 Share My Opinion

                      </button>

                      <button
                        className="btn btn-success py-3 rounded-4 fw-bold fs-5"
                        onClick={downloadCard}
                      >

                        📸 Download Share Card

                      </button>

                    </>

                  )

                }

                <button
                  className="btn btn-primary py-3 rounded-4 fw-bold fs-5"
                  onClick={() => navigate("/analytics")}
                >

                  📊 Detailed Analytics

                </button>

                <button
                  className="btn btn-success py-3 rounded-4 fw-bold fs-5"
                  onClick={() => navigate("/vote")}
                >

                  {

                    hasVoted
                      ? "🗳️ Update My Opinion"
                      : "✅ Submit Opinion"

                  }

                </button>

                <button
                  className="btn btn-dark py-3 rounded-4 fw-bold fs-5"
                  onClick={() => navigate("/")}
                >

                  🏠 Back To Home

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Results;