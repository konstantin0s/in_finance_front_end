import React from "react";
import Block from "./Block.js";

export default class Document extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			index: {
				main:0,
				body:0,
				archive:0
			}
		};
	}

	render(){
		let pointer = 0;
		let group = "main";

		return <div>
		<h2>Document Blocks</h2>
		{this.props.blocks.map((item, index) => {
			if ((!item.isAdvert || item.source === "1") && item.iterations === 1) {
				if (group !== item.group) {
					group = item.group;
					pointer = 0;
				}
				let article = this.props.articles[group][pointer];
				pointer++;
				return <Block key={item.name} block={item} 
								hasArticle={true} 
								article={article}
								enableBlock={this.props.enableBlock} 
								disableBlock={this.props.disableBlock} 
								setAdSource={this.props.setAdSource}
								setAdType={this.props.setAdType}
								updateBlockContent={this.props.updateBlockContent}
								/>			
			} else {
				return <Block key={item.name} block={item} 
								hasArticle={false}
								enableBlock={this.props.enableBlock} 
								disableBlock={this.props.disableBlock}  
								setAdSource={this.props.setAdSource}
								setAdType={this.props.setAdType}
								updateBlockContent={this.props.updateBlockContent}
								/>		
			}

		})}
		</div>
	}
}