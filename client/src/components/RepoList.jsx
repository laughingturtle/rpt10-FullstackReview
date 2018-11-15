import React from 'react';
//import './style.css';

const colorStyle = {
  color: '#a9a9a9'
};

const RepoList = (props) => (
  <div>
    <div>
    <h4> Repo List Component </h4>
    There are <strong>{props.repos.length}</strong> repos.
    </div>
    <div>
    <ul>
    {props.repos.map((item) => (
      <li><strong><span className="colorStyle">{item.user_name}</span></strong> | <a href={item.repo_url} target="_blank">{item.repo_name}</a></li>
      ))
    }
    </ul>
    </div>
  </div>
)


export default RepoList;