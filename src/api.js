import fetch from 'isomorphic-fetch'

export function fetchPosts() {
  return fetch('path to database')
		.then(res => res.json())
		// parse data from firebase
		.then(data => Object.keys(data).reduce((arr, key) => {
			arr.push(data[key])
			return arr
		}, []))
}
