import React, { useEffect, useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { getPosts,getPostsBySearch } from "../../actions/postsAction";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import Pagination from "../Pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  //
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  //
const searchPost =() => {
  if(search.trim() || tags){
    dispatch(getPostsBySearch({search,tags:tags.join(',')}))
    navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
  } 
  else{
    navigate('/')
  }
}

// const searchPost = () => {
//   if (search.trim() || tags) {
//     dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
//     navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
//   } else {
//     navigate('/')
//   }
// };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                onKeyDown={handleKeyPress}
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />

              <Button onClick={searchPost}  variant="contained" color="primary" >Search </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Pagination />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
