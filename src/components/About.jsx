import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Container, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import Fade from "react-reveal";
import Header from "./Header";
import endpoints from "../constants/endpoints";
import FallbackSpinner from "./FallbackSpinner";
import "../css/about.css"; // Import the CSS file for media queries

const styles = {
  header: {
    marginTop: "100px",
  },
  rowContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  introImageContainer: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  introTextContainer: {
    margin: 10,
    flexDirection: "column",
    whiteSpace: "pre-wrap",
    textAlign: "center",
    fontSize: "1.2em",
    fontWeight: 500,
    marginTop: 60,
  },
  introImage: {
    width: "100%",
    maxWidth: "700px",
    borderRadius: "0%",
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => <ReactMarkdown children={text} />;

  useEffect(() => {
    fetch(endpoints.about, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <div style={styles.header}>
        <Header title={header} />
      </div>
      <div className="section-content-container">
        <Container>
          {data ? (
            <Fade>
              <Row style={styles.rowContainer}>
                <Col xs={12} md={4} style={styles.introImageContainer}>
                  <img
                    src={data?.imageSource}
                    alt="profile"
                    style={styles.introImage}
                  />
                </Col>
                <Col xs={12} md={8} style={styles.introTextContainer}>
                  {parseIntro(data.about)}
                </Col>
              </Row>
            </Fade>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
