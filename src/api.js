import fetch from 'isomorphic-fetch'

export function fetchPosts() {
  return fetch('some url')
		.then(res => res.json())
		.then(data => Object.keys(data).reduce((arr, key) => {
			arr.push(data[key])
			return arr
		}, []))
}
