import React from "react"
import { connect } from "react-redux"
import { fetchData } from "../store"

class Home extends React.Component {
  componentDidMount() {
    if (this.props.posts.length <= 0) {
      this.props.fetchData()
    }
  }

  render( ) {
    const { posts } = this.props
		console.log(posts)
    return (
      <div>
        <ul>
          {posts.map(({ id, title, blurb, body }) => (
            <li key={id}>{title} - {blurb}</li>
          ))}
        </ul>
      </div>
    )
  }
}

Home.serverFetch = fetchData // static declaration of data requirements

const mapStateToProps = state => ({
  posts: state.data
})

const mapDispatchToProps = {
  fetchData,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
