import { useNavigate } from "react-router-dom";

function Help() {

  const navigate = useNavigate();

  return (

    <div
      className="container-fluid py-4 px-2"
      style={{
        background:
          "linear-gradient(to bottom right,#f3fff6,#ffffff)",
        minHeight: "100vh"
      }}
    >

      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div
            className="card border-0 shadow-lg"
            style={{
              borderRadius: "30px"
            }}
          >

            <div className="card-body p-4 p-md-5">

              {/* HEADER */}

              <div className="text-center mb-5">

                <div
                  style={{
                    fontSize: "60px"
                  }}
                >
                  ❓
                </div>

                <h1
                  className="fw-bold mt-3"
                  style={{
                    color: "#198754"
                  }}
                >
                  Help & About
                </h1>

                <h4 className="text-muted">

                  കേരള ജന ശബ്ദം

                </h4>

              </div>

              {/* ABOUT */}

              <div className="mb-5">

                <h3 className="fw-bold text-success">

                  🗳️ What is this platform?

                </h3>

                <p
                  className="mt-3"
                  style={{
                    fontSize: "17px",
                    lineHeight: "1.9"
                  }}
                >

                  Kerala People's Voice is an independent
                  public opinion platform where people can
                  share their views about Kerala's future
                  leadership and public mood.

                </p>

              </div>

              {/* HOW IT WORKS */}

              <div className="mb-5">

                <h3 className="fw-bold text-primary">

                  ⚙️ How does it work?

                </h3>

                <div className="mt-4">

                  <div className="mb-4">

                    <h5 className="fw-bold">

                      1️⃣ Submit Your Opinion

                    </h5>

                    <p>

                      Select your preferred candidate,
                      district and reason.

                    </p>

                  </div>

                  <div className="mb-4">

                    <h5 className="fw-bold">

                      2️⃣ View Live Results

                    </h5>

                    <p>

                      See live public mood,
                      district trends and analytics.

                    </p>

                  </div>

                  <div className="mb-4">

                    <h5 className="fw-bold">

                      3️⃣ Share Your Opinion

                    </h5>

                    <p>

                      Download and share your opinion card
                      on WhatsApp and social media.

                    </p>

                  </div>

                  <div className="mb-4">

                    <h5 className="fw-bold">

                      4️⃣ Update Anytime

                    </h5>

                    <p>

                      You can update your opinion anytime.

                    </p>

                  </div>

                </div>

              </div>

              {/* IMPORTANT */}

              <div
                className="p-4 mb-5"
                style={{
                  background:
                    "#fff3cd",
                  borderRadius: "20px"
                }}
              >

                <h4 className="fw-bold text-warning">

                  ⚠️ Important

                </h4>

                <p className="mb-0 mt-3">

                  This is NOT an official election survey
                  or political polling organization.
                  It is an independent public opinion platform.

                </p>

              </div>

              {/* PRIVACY */}

              <div className="mb-5">

                <h3 className="fw-bold text-danger">

                  🔒 Privacy

                </h3>

                <p
                  className="mt-3"
                  style={{
                    lineHeight: "1.9"
                  }}
                >

                  No login is required.
                  Personal identity information is not collected.

                </p>

              </div>

              {/* BUTTONS */}

              <div className="d-grid gap-3">

                <button
                  className="btn btn-success py-3 rounded-4 fw-bold fs-5"
                  onClick={() => navigate("/vote")}
                >

                  🗳️ Submit Opinion

                </button>

                <button
                  className="btn btn-dark py-3 rounded-4 fw-bold fs-5"
                  onClick={() => navigate("/")}
                >

                  🏠 Back Home

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Help;