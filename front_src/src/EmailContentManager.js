import React from "react";
import "./App.css";
import Document from "./Document.js";
import XML from "./XML.js";

export default class EmailContentManager extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			articles: [],
			blocks: [],
			blocksLoaded: false,
			articlesLoaded: false,
		}
	}

  componentDidMount() { 
    this.apiFetch("GET", "articles", this.handler_setArticles.bind(this));
    this.apiFetch("GET", "blocks", this.handler_setBlocks.bind(this)); 
   }

  apiFetch(method, endpoint, callback, data) {
  	console.log(endpoint);
    const url = "https://www.emailenzo.com/customer/infinance/backend/custom.php?api=" + endpoint;
    fetch(url,{ 
      method: method, 
      credentials:"include",
      body: JSON.stringify(data)
    }).then(result => result.json())
    	.then(result => { if (result.data) { callback(result, data); }},
          error  => { this.setState({ error }) });
  }

  handler_setArticles(response, callData) { this.setState({articles:response.data, articlesLoaded: true}); }
  handler_setBlocks(response, callData) {  this.setState({blocks:response.data, blocksLoaded:true}); }

	handler_updateBlock(response, callData) {
		let blocks = this.state.blocks;
		blocks = blocks.map((block, index)=>{ return (block.id === response.data.id)?response.data:block;});
		this.setState({blocks:blocks});
	}

	enableBlock(id){ this.apiFetch("GET", "block/" + id + "/enable", this.handler_updateBlock.bind(this)); }
	disableBlock(id){ this.apiFetch("GET", "block/" + id + "/disable", this.handler_updateBlock.bind(this)); }
	setAdSource(id, source) { this.apiFetch("GET", "block/" + id + "/source/" + source, this.handler_updateBlock.bind(this));}
	setAdType(id, type) { this.apiFetch("GET", "block/" + id + "/type/" + type, this.handler_updateBlock.bind(this)); }


	updateBlockContent(id, data){
		let formated = {};
		data.map(textField =>{
			let name = textField.name;
			let content = textField.content;
			formated[name] = content;
		});
		this.apiFetch("POST", "block/" + id + "/edit", this.handler_updateBlock.bind(this), formated);
	}

  moveArticle(){}
  updateArticleContent(){}

	render() {
		return(
			<div className="dashboard">
				<div className="container">
					<div className="blocks">
						{!this.state.blocksLoaded && <div>loading blocks.. </div> }
						{this.state.blocksLoaded && this.state.articlesLoaded &&
							<Document blocks={this.state.blocks}  articles={this.state.articles} 
								enableBlock={this.enableBlock.bind(this)}
								disableBlock={this.disableBlock.bind(this)}
								setAdType={this.setAdType.bind(this)}
								setAdSource={this.setAdSource.bind(this)}
								updateBlockContent={this.updateBlockContent.bind(this)}
							/> }
					</div>
					<div className="articles">
						{!this.state.articlesLoaded && <div>loading articles.. </div> }
						{this.state.articlesLoaded && 
							<XML articles={this.state.articles} /> }
					</div>
				</div>
			</div>);
	}
}
