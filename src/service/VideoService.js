export default class VideoService {
  getVideoBykeyword(keyword, maxResult) {
    return fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResult}&q=${keyword}&type=video&key=AIzaSyDQi1QMfN7ysZq8YPxG8-h9gFNfRFVjsto`
    ).then((res) => res.json());
  }
}
