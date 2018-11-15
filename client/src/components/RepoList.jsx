import React from 'react';

const RepoList = (props) => (
  <div>
    <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    </div>
    <div>
    <ul>
    {props.repos.map((item) => (
      <li>{item.user_name} | <a href={item.repo_url} target="_blank">{item.repo_name}</a></li>
      ))
    }
    </ul>
    </div>
  </div>
)


export default RepoList;