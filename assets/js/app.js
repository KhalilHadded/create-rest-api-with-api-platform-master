import React from 'react';
 import ReactDOM from 'react-dom';
 
 import Items from './Components/Items';
 
 
 class App extends React.Component {
     constructor() {
         super();
 
         this.state = {
             entries: []
         };
     }
 
     componentDidMount() {
         fetch('http://localhost:8000/api/blog_posts')
             .then(response => response.json())
             .then(entries => {
                 this.setState({
                     entries
                 });
             });
     }
 
     render() {
		 console.log(this.state.entries);
         return (
             <div className="row">
                 {this.state.entries.map(
                     ({ id, title, content }) => (
                         <Items
                             key={id}
                             title={title}
                             body={content}
                         >
                         </Items>
                     )
                 )}
             </div>
         );
     }
 }
 
 ReactDOM.render(<App />, document.getElementById('root'));