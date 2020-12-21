import React from "react";
import ArticleList from "./ArticleList.js"

export default class XML extends React.Component {

	render(){
		return <div>
		<h2>XML Articles</h2>
		{["main","body","archive","unused"].map((item, index) => {
				const list = this.props.articles[item];
				return <ArticleList key={item} articles={list} name={item} />
		})}
		</div>

	}
}