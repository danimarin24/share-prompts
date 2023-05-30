'use client';
import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null); // timeout to get the full searchText
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const fetchAllPost = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();

    setAllPosts(data);
  };

  // get all filtered posts
  const filterPrompts = (searchText) => {
    const regexExp = new RegExp(searchText, 'i');
    return allPosts.filter(
      (item) =>
        regexExp.test(item.creator.username) ||
        regexExp.test(item.tag) ||
        regexExp.test(item.prompt)
    );
  };

  useEffect(() => {
    fetchAllPost();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setFilteredPosts(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tag) => {
    // setting the search input with the value
    setSearchText(tag);
    // and then filter the results
    const searchResult = filterPrompts(tag);
    setFilteredPosts(searchResult);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {searchText ? (
        <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
