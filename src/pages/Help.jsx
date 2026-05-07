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

        <div className="col-lg-7">

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
                    fontSize: "65px"
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

              <div
                className="p-4 mb-4"
                style={{
                  background:
                    "#f4fff7",
                  borderRadius: "22px"
                }}
              >

                <h4 className="fw-bold text-success">

                  🗳️ About

                </h4>

                <p
                  className="mt-3 mb-0"
                  style={{
                    lineHeight: "1.9"
                  }}
                >

                  Kerala People's Voice is a public opinion platform.

                  <br /><br />

                  കേരളത്തിന്റെ ഭാവി നേതൃത്വത്തെ കുറിച്ചുള്ള
                  ജനങ്ങളുടെ അഭിപ്രായങ്ങൾ രേഖപ്പെടുത്താനുള്ള
                  ഒരു platform ആണ് ഇത്.

                </p>

              </div>

              {/* HOW */}

              <div
                className="p-4 mb-4"
                style={{
                  background:
                    "#eef6ff",
                  borderRadius: "22px"
                }}
              >

                <h4 className="fw-bold text-primary">

                  ⚙️ How To Use

                </h4>

                <div
                  className="mt-3"
                  style={{
                    lineHeight: "2"
                  }}
                >

                  <p>

                    1️⃣ Select candidate & district

                    <br />

                    സ്ഥാനാർത്ഥിയും ജില്ലയും തിരഞ്ഞെടുക്കുക

                  </p>

                  <p>

                    2️⃣ Select reason / opinion

                    <br />

                    കാരണം / നിലപാട് തിരഞ്ഞെടുക്കുക

                  </p>

                  <p>

                    3️⃣ Submit your opinion

                    <br />

                    അഭിപ്രായം രേഖപ്പെടുത്തുക

                  </p>

                  <p className="mb-0">

                    4️⃣ View live public opinion & analytics

                    <br />

                    Live public opinion & analytics കാണാം

                  </p>

                </div>

              </div>

              {/* FEATURES */}

              <div
                className="p-4 mb-4"
                style={{
                  background:
                    "#fff8e1",
                  borderRadius: "22px"
                }}
              >

                <h4 className="fw-bold text-warning">

                  ✨ Features

                </h4>

                <div
                  className="mt-3"
                  style={{
                    lineHeight: "2"
                  }}
                >

                  <p>

                    📊 Live Results

                  </p>

                  <p>

                    🏆 District Trends

                  </p>

                  <p>

                    📈 Detailed Analytics

                  </p>

                  <p>

                    📤 Shareable Opinion Cards

                  </p>

                  <p className="mb-0">

                    🔄 Update Opinion Anytime

                  </p>

                </div>

              </div>

              {/* IMPORTANT */}

              <div
                className="p-4 mb-4"
                style={{
                  background:
                    "#fff3cd",
                  borderRadius: "22px"
                }}
              >

                <h4 className="fw-bold text-danger">

                  ⚠️ Important

                </h4>

                <div
                  className="mt-3"
                  style={{
                    lineHeight: "2"
                  }}
                >

                  <p>

                    🗳️ One device = one opinion at a time

                    <br />

                    ഒരു ഉപകരണത്തിൽ നിന്ന് ഒരേസമയം
                    ഒരു അഭിപ്രായം മാത്രം

                  </p>

                  <p>

                    🔄 Opinion can be updated anytime

                    <br />

                    അഭിപ്രായം എപ്പോൾ വേണമെങ്കിലും മാറ്റാം

                  </p>

                  <p>

                    🔒 No login required

                    <br />

                    Login ആവശ്യമില്ല

                  </p>

                  <p className="mb-0">

                    📊 This is NOT an official election survey

                    <br />

                    ഇത് ഔദ്യോഗിക തിരഞ്ഞെടുപ്പ് സർവേ അല്ല

                  </p>

                </div>

              </div>

              {/* BUTTONS */}

              <div className="d-grid gap-3 mt-5">

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