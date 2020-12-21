import React from "react";


export default class ArticleList extends React.Component {
	render(){
		return 		(
			<div className="folder">

			<div className="title">{this.props.name}</div>

			<div className="list">{this.props.articles.map((item,index) => (

				<div key={index + "_" + item} className="listItem">{index+1} - {item.title}</div>))}

			</div>

		</div>)
	}
}
