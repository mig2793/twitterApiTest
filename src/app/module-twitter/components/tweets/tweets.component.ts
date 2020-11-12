import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../../shared/twitter.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.less']
})
export class TweetsComponent implements OnInit {

  classAnimation: string[];
  finalAnimation: string;
  open: boolean;
  openTextCard: boolean[];
  searchText: string;
  tweets: any[];
  optionsSearch: any;
  retweetMe: any = [];
  favoritesMe: any = [];

  constructor(
    private twitterServices: TwitterService
  ) {
    this.tweets = [];
    this.retweetMe = [];
    this.favoritesMe = [];
    this.openTextCard = [];
  }

  ngOnInit(): void {
    this.open = false;
  }

  searchTweets(url?: string) {
    let finalUrl: string = "";
    finalUrl = (url != undefined) ? url : `?q=${this.searchText}&count=9`;
    if (this.searchText) {
      let url = `twitters${finalUrl}`
      this.twitterServices.getTweets(url).subscribe(res => {
        if (res.data.statuses.length > 0) {
          this.tweets = this.tweets.concat(res.data.statuses);
          this.classAnimation = new Array(this.tweets.length);
          this.openTextCard = new Array(this.tweets.length);
          this.openTextCard.fill(false);
          this.optionsSearch = res.data.search_metadata;
          this.getRetweetMe();
          this.getFavoritesMe();
        } else {
          alert("No se encontraron resultados");
        }
      }, err => {
        alert(err);
      })
    }
  }

  retweet(idTweet: number) {
    let url = `retweet`;
    let data = { id: idTweet }
    this.twitterServices.postTweets(url, data).subscribe((res: any) => {
      try {
        if (res.resp.statusCode = 200) {
          if (res.data.retweeted == true) {
            this.tweets.filter(res => res.id_str == idTweet)[0].retweeted = true;
            alert("Retweet realizado");
          }
        }
      }
      catch (e) {
        if (res.message) {
          alert(res.message);
        }
      }
    }, err => {
      alert(err);
    })
  }

  getRetweetMe() {
    let url = `retweet-me`;
    this.twitterServices.getTweets(url).subscribe((response: any) => {
      this.retweetMe = response.data;
      this.retweetMe.forEach(res => {
        let tweetFilter = this.tweets.filter(tweet => tweet.id_str == res.id_str);
        if (tweetFilter.length > 0) {
          tweetFilter[0].retweeted = true;
        }
      });
    }, err => {
      alert(err);
    })
  }

  getFavoritesMe() {
    let url = `favorite-me`;
    this.twitterServices.getTweets(url).subscribe((response: any) => {
      this.favoritesMe = response.data;
      this.favoritesMe.forEach(res => {
        let tweetFilter = this.tweets.filter(tweet => tweet.id_str == res.id_str);
        if (tweetFilter.length > 0) {
          tweetFilter[0].favorited = true;
        }
      });
    }, err => {
      alert(err);
    })
  }

  favoriteDestroy(idTweet: number) {
    let url = `favorite-destroy`;
    let data = { id: idTweet }
    this.twitterServices.postTweets(url, data).subscribe((res: any) => {
      try {
        if (res.resp.statusCode = 200) {
          if (res.data.favorited == false) {
            this.tweets.filter(res => res.id_str == idTweet)[0].favorited = false;
            alert("Ya no tienes como favorito a este tweet");
          }
        }
      }
      catch (e) {
        if (res.message) {
          alert(res.message);
        }
      }
    }, err => {
      alert(err);
    })
  }

  favoriteTwitter(idTweet: number) {

    if (this.tweets.filter(res => res.id_str == idTweet)[0].favorited == true) {
      this.favoriteDestroy(idTweet);
    } else {
      let url = `favorite`;
      let data = { id: idTweet }
      this.twitterServices.postTweets(url, data).subscribe((res: any) => {
        console.log(res);
        try {
          if (res.resp.statusCode = 200) {
            if (res.data.favorited == true) {
              this.tweets.filter(res => res.id_str == idTweet)[0].favorited = true;
              alert("Agregado a favoritos");
            }
          }
        }
        catch (e) {
          if (res.message) {
            alert(res.message);
          }
        }
      }, err => {
        alert(err);
      })
    }
  }

  searchTweetsText() {
    this.tweets = [];
    this.searchTweets();
  }

  openCard(index: number) {
    this.openTextCard[index] = !this.openTextCard[index];
    if (this.openTextCard[index]) {
      this.classAnimation[index] = "animation";
      this.openTextCard[index] = true;
    } else {
      this.classAnimation[index] = "";
      this.openTextCard[index] = false;
    }
  }

  onScroll() {
    if (this.optionsSearch.next_results != "0")
      this.searchTweets(this.optionsSearch.next_results);
    else
      alert('No hay más datos');

  }

}
