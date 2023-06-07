import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  NavDropdown,
  Nav,
  Button,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CiLogout } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, Navigate, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const baseURL = "http://localhost:3001/api";
  const navigate = useNavigate();
  const location = useLocation();
  const [priceRange, setPriceRange] = useState("");
  const [search, setSearch] = useState("");
  const [genres, setAllGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleFilter = async () => {
    const queryParams = new URLSearchParams();

    if (selectedGenre) {
      queryParams.set("genreId", selectedGenre);
    }

    if (priceRange) {
      queryParams.set("priceRange", priceRange);
    }

    if (search) {
      queryParams.set("search", encodeURIComponent(search));
    }

    const searchUrl = `${baseURL}/searchAllGames?${queryParams.toString()}`;

    try {
      const response = await fetch(searchUrl, {
        method: "GET",
      });
      const data = await response.json();
      setSearchResults(data.message);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }

    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const loadGenres = async () => {
    try {
      const response = await fetch(`${baseURL}/readAllGenres`, {
        method: "GET",
      });
      const data = await response.json();
      setAllGenres(data.message);
    } catch (error) {
      console.error("Error loading genres:", error);
    }
  };

  useEffect(() => {
    loadGenres();
  }, []);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img src="../../logo.png" style={{ width: 140 }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
            <Form className="d-flex">
              {/* <Form.Control
                type="text"
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              /> */}
              <Form.Select
                className="me-2"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                <option>All Genres</option>
                {genres.length > 0 &&
                  genres.map((genre) => (
                    <option key={genre._id} value={genre._id}>
                      {genre.genreName}
                    </option>
                  ))}
              </Form.Select>
              {/* <Form.Control
                type="text"
                placeholder="Price Range"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              /> */}
              <Button
                className="ms-2"
                variant="outline-primary"
                onClick={handleFilter}
              >
                Filter
              </Button>
            </Form>
            <Button
              style={{ marginLeft: 10 }}
              onClick={logout}
              variant="outline-danger"
            >
              <CiLogout size={22} />
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{ marginTop: 10 }}>
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((game) => (
            <div key={game._id}>
              <h4 style={{ color: "#A2CEFF" }}>{game.gameName}</h4>
              <p style={{ color: "#F1A208" }}>
                Genre: {game.genreId.genreName}
              </p>
              <p style={{ color: "green" }}>Price: {game.gamePrice} $</p>

              <img
                src={game.gameImage}
                style={{
                  width: "10%",
                  height: "10%",
                  borderRadius: 20,
                  marginBottom: 15,
                }}
                alt="Game Image"
              />
            </div>
          ))
        ) : (
          <p style={{ color: "#fff" }}></p>
        )}
      </div>
    </>
  );
};

export default Header;

// {genres.length > 0 &&
// genres.map((genre) => (
//   <option key={genre._id} value={genre._id}>
//     {genre.genreName}
//   </option>
// ))}
