import React from "react";

export default class Block extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			textBlocks: props.block.children,
			type: props.block.type,
		}
	}

	componentDidUpdate(){
		if (this.props.block.type !== this.state.type) {
			this.setState({type:this.props.block.type, textBlocks: this.props.block.children});
		}
	}
  handleChange(event, index) {
  	let textBlocks = this.state.textBlocks;
  	textBlocks[index]['content'] = event.target.value;
    this.setState({textBlocks: textBlocks});
  }



	render(){
		const block = this.props.block;

		return (
			<div className={"block " + (block.isAdvert ? "ad":"article")}>
				<div className="title">{block.name}</div>

				<div className="controls">

					<div  className="controller">
						<div>Status</div>
						{block.iterations === 1 &&	
						<div  className="buttons">
							<button onClick={() => {this.props.disableBlock(block.id)}} >Disable</button>
							<button onClick={() => {this.props.enableBlock(block.id)}} disabled>Enable</button>
						</div>}
						{block.iterations === 0 &&	
						<div className="buttons">
							<button onClick={() => {this.props.disableBlock(block.id)}} disabled>Disable</button>
							<button onClick={() => {this.props.enableBlock(block.id)}}>Enable</button>
						</div> }
					</div>
				
					{block.isAdvert && block.type !== null && block.iterations !== 0 &&
					<div  className="controller">
						<div>Source</div>
						<div className="buttons">
							{block.isAdvert && block.source === "1" && 
							<div className="buttons">
								<button onClick={() => {this.props.setAdSource(block.id, 1)}} disabled>XML</button>
								<button onClick={() => {this.props.setAdSource(block.id, 0)}}>Manual</button>
							</div> }
							{block.isAdvert && block.source === "0" && 
							<div className="buttons">
								<button onClick={() => {this.props.setAdSource(block.id, 1)}}>XML</button>
								<button onClick={() => {this.props.setAdSource(block.id, 0)}} disabled>Manual</button>
							</div> }
						</div>
					</div> }

					{block.isAdvert && block.type &&
					<div className="controller">
						<div>Layout Type</div>
						<div className="buttons">
							{block.isAdvert && block.type === "0" && <button onClick={() => {this.props.setAdType(block.id, 0)}} disabled>0</button>}
							{block.isAdvert && (block.type === "1" || block.type === "2" || block.type === "3") && <button onClick={() => {this.props.setAdType(block.id, 0)}}>0</button>}
							{block.isAdvert && block.type === "1" && <button onClick={() => {this.props.setAdType(block.id, 1)}} disabled>1</button>}
							{block.isAdvert && (block.type === "0" || block.type === "2" || block.type === "3") && <button onClick={() => {this.props.setAdType(block.id, 1)}}>1</button>}
							{block.isAdvert && block.type === "2" && <button onClick={() => {this.props.setAdType(block.id, 2)}} disabled>2</button>}
							{block.isAdvert && (block.type === "0" || block.type === "1" || block.type === "3") && <button onClick={() => {this.props.setAdType(block.id, 2)}}>2</button>}
							{block.isAdvert && block.type === "3" && <button onClick={() => {this.props.setAdType(block.id, 3)}} disabled>3</button>}
							{block.isAdvert && (block.type === "0" || block.type === "1" || block.type === "2") && <button onClick={() => {this.props.setAdType(block.id, 3)}}>3</button>}
						</div>
					</div> }

				</div>

		 		{!this.props.hasArticle && block.iterations === 1 &&
		 			<div>
		 				<div>
		 					{this.state.textBlocks.map((textBlock, index) => {
		 						return <div key={textBlock.id}>
		 								<div>{textBlock.name} : <input type="text" value={textBlock.content} name={textBlock.name} onChange={(e)=> {this.handleChange(e, index)}}/></div>
		 							</div>
		 					})}
		 					<button onClick={()=>{this.props.updateBlockContent(block.id, this.state.textBlocks)}}>update content</button>
		 				</div>
		 			</div>}

		 		{this.props.hasArticle  &&  this.props.article !== undefined &&
		 			<div>
		 				<div>Title: {this.props.article.title}</div> 
		 				<div>Description: {this.props.article.description}</div> 
		 			</div> 
		 		}


		 </div>);
	}
}
	