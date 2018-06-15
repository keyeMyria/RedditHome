export default class Channel {
    id:String;
    name: String;
    title:String;
    isFavourite:Boolean;
    thumbUrl:String;
    url: String;

    _index:String;

    constructor(id:String, name:String, title:String, isFavourite: Boolean, thumbUrl: String, url: String) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.isFavourite = isFavourite;
        this.thumbUrl = thumbUrl;
        this.url = url;

        this._index = title.toLocaleLowerCase();
    }

    containsSearch(search: String) : Boolean {
        return this._index.includes(search);
    }
}