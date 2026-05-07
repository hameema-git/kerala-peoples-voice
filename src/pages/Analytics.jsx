import { useEffect, useState } from "react";

import { db } from "../firebase";

import { ref, onValue } from "firebase/database";

import { useNavigate } from "react-router-dom";

function Analytics() {

  const [votes, setVotes] = useState([]);

  const navigate = useNavigate();

  const voterId =
    localStorage.getItem("kerala_voice_voter");

  const hasVoted = !!voterId;

  useEffect(() => {

    const votesRef = ref(db, "votes");

    onValue(votesRef, (snapshot) => {

      const data = snapshot.val();

      if (data) {

        setVotes(Object.values(data));

      }

    });

  }, []);

  const totalVotes = votes.length;

  const candidateCounts = {};

  const districtCounts = {};

  const reasonCounts = {};

  const candidateReasonStats = {};

  votes.forEach((vote) => {

    candidateCounts[vote.candidate] =
      (candidateCounts[vote.candidate] || 0) + 1;

    districtCounts[vote.district] =
      (districtCounts[vote.district] || 0) + 1;

    const reason =
      vote.opinion || "No Reason Selected";

    reasonCounts[reason] =
      (reasonCounts[reason] || 0) + 1;

    if (!candidateReasonStats[vote.candidate]) {

      candidateReasonStats[vote.candidate] = {};

    }

    candidateReasonStats[vote.candidate][reason] =
      (candidateReasonStats[vote.candidate][reason] || 0) + 1;

  });

  const topReason =
    Object.entries(reasonCounts)
      .sort((a, b) => b[1] - a[1])[0];

  const leadingCandidate =
    Object.entries(candidateCounts)
      .sort((a, b) => b[1] - a[1])[0];

  return (

    <div
      className="container-fluid px-2 px-md-4 py-3 min-vh-100"
      style={{
        background:
          "linear-gradient(to bottom right,#ecfff3,#ffffff)"
      }}
    >

      <div className="row justify-content-center">

        <div className="col-lg-9">

          <div
            className="card border-0 shadow-lg p-3 p-md-5"
            style={{
              borderRadius: "28px"
            }}
          >

            {/* HEADER */}

            <div className="text-center mb-4">

              <div className="mb-3">

                <span
                  className="badge rounded-pill px-4 py-2 fs-6"
                  style={{
                    background: "#dc3545"
                  }}
                >
                  🔴 LIVE UPDATES
                </span>

              </div>

              <h1
                className="fw-bold display-5"
                style={{
                  color: "#006400"
                }}
              >
                📊 കേരള ജന വിശകലനം
              </h1>

              <h3 className="fw-semibold">

                Kerala Public Analytics

              </h3>

              <p className="text-muted mt-3">

                Live analysis of public opinion across Kerala

              </p>

            </div>

            {/* TOTAL VOTES */}

            <div
              className="card border-0 shadow-sm mb-4"
              style={{
                background:
                  "linear-gradient(to right,#198754,#20c997)",
                borderRadius: "24px"
              }}
            >

              <div className="card-body text-center text-white">

                <h1 className="fw-bold">
                  {totalVotes}
                </h1>

                <h4>Total Public Opinions</h4>

              </div>

            </div>

            {/* LEADING CANDIDATE */}

            {

              leadingCandidate && (

                <div
                  className="card border-0 shadow-lg mb-5 text-white"
                  style={{
                    background:
                      "linear-gradient(to right,#ff9800,#ff5722)",
                    borderRadius: "24px"
                  }}
                >

                  <div className="card-body text-center">

                    <h5 className="fw-bold">

                      🏆 Current Leading Candidate

                    </h5>

                    <h2 className="fw-bold mt-3">

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

            {/* TOP REASON */}

            {

              topReason && (

                <div
                  className="alert alert-warning border-0 shadow-sm rounded-4 mb-5"
                >

                  <h4 className="fw-bold">

                    💡 Most Popular Public Reason

                  </h4>

                  <h2 className="mt-3">

                    {topReason[0]}

                  </h2>

                  <p className="mb-0">

                    Selected by {topReason[1]} voters

                  </p>

                </div>

              )

            }

            {/* REASON STATS */}

            <div className="mb-5">

              <h3 className="fw-bold text-primary mb-4">

                💡 Why People Support Candidates

              </h3>

              {

                Object.entries(reasonCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([reason, count]) => {

                    const percentage =
                      ((count / totalVotes) * 100)
                        .toFixed(1);

                    return (

                      <div
                        key={reason}
                        className="mb-4"
                      >

                        <div className="d-flex justify-content-between">

                          <h6 className="fw-bold">

                            {reason}

                          </h6>

                          <h6 className="fw-bold text-success">

                            {percentage}%

                          </h6>

                        </div>

                        <div
                          className="progress"
                          style={{
                            height: "28px",
                            borderRadius: "20px"
                          }}
                        >

                          <div
                            className="progress-bar progress-bar-striped progress-bar-animated bg-info"

                            style={{
                              width: `${percentage}%`
                            }}
                          >

                            {count} Votes

                          </div>

                        </div>

                      </div>

                    );

                  })

              }

            </div>

            {/* CANDIDATE ANALYSIS */}

            <div className="mb-5">

              <h3 className="fw-bold text-success mb-4">

                🗳️ Candidate Wise Analysis

              </h3>

              {

                Object.entries(candidateReasonStats)
                  .map(([candidate, reasons]) => (

                    <div
                      className="card border-0 shadow-sm rounded-4 mb-4"
                      key={candidate}
                    >

                      <div className="card-body">

                        <h4 className="fw-bold mb-4">

                          {candidate}

                        </h4>

                        {

                          Object.entries(reasons)
                            .sort((a, b) => b[1] - a[1])
                            .map(([reason, count]) => (

                              <div
                                key={reason}
                                className="d-flex justify-content-between border-bottom py-2"
                              >

                                <span>

                                  {reason}

                                </span>

                                <strong>

                                  {count}

                                </strong>

                              </div>

                            ))

                        }

                      </div>

                    </div>

                  ))

              }

            </div>

            {/* DISTRICT PARTICIPATION */}

            <div className="mb-5">

              <h3 className="fw-bold text-danger mb-4">

                📍 District Participation

              </h3>

              <div className="row">

                {

                  Object.entries(districtCounts)
                    .sort((a, b) => b[1] - a[1])
                    .map(([district, count]) => (

                      <div
                        className="col-md-6 mb-3"
                        key={district}
                      >

                        <div className="card border-0 shadow-sm rounded-4">

                          <div className="card-body d-flex justify-content-between">

                            <h5 className="fw-bold mb-0">

                              {district}

                            </h5>

                            <span
                              className="badge bg-danger rounded-pill fs-6"
                            >

                              {count}

                            </span>

                          </div>

                        </div>

                      </div>

                    ))

                }

              </div>

            </div>

            {/* SHARE BUTTON */}

            <div className="d-grid mb-4">

              <button
                className="btn btn-warning py-3 rounded-4 fw-bold fs-5"
                onClick={() => {

                  navigator.share({

                    title:
                      "Kerala People's Voice",

                    text:
                      "Check Kerala's Live Public Opinion Dashboard",

                    url:
                      window.location.origin

                  });

                }}
              >

                📤 Share Analytics

              </button>

            </div>

            {/* FOOTER BUTTONS */}

            <div className="d-grid gap-3">

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
                className="btn btn-primary py-3 rounded-4 fw-bold fs-5"
                onClick={() => navigate("/results")}
              >

                📊 Back to Results

              </button>

              <button
                className="btn btn-dark py-3 rounded-4 fw-bold fs-5"
                onClick={() => navigate("/")}
              >

                🏠 Back to Home

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Analytics;