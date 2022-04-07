# quote_api
Quote API RESTful Node.js based Multilingual (Italian, English) is a free, open source quote api to get random quote. Quotes are loaded on sqlite3 DB. 

## API Reference

- [Get Random Quote](#Randomquote)  
- [Info](#Info)  
- [Error Managment](#Error-Managment)


<hr/>

## Random quote

```HTTP
GET /versions
```

Return a random quote.

**Query parameters**  


| Param     | Type     | Description   | Mandatory                                                                                                                                                                                                                                                                                                                          |
| :-------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |---|
| language | `String`    | Language Code (ex. en, it, ...) | Yes | 

**Response**

```ts
{
    // Quote
    quote: string
    // Author name
    author: string
    // tags
    tags: string
}
```
**Examples**

`http://localhost:35907/randomquote?language=en`

```
{
  "quote": "Three things cannot be long hidden: the sun, the moon, and the truth.",
  "author": "Buddha",
  "tags": "famous"
}
```
<hr/>

## Info

```HTTP
GET /Info
```

Return info about total quotes and authors.

**Query parameters**  

| Param     | Type     | Description   | Mandatory                                                                                                                                                                                                                                                                                                                          |
| :-------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |---|
| language | `String`    | Language Code (ex. en, pt, it, ...) | Yes | 

**Response**  

```ts
{
    // Language code
    language: string
    // Total quotes loaded
    quotes: number
    // Total authors loaded 
    authors: number
}
```
**Examples**

`http://localhost:35907/info?language=en`

```
{
  "language": "en",
  "quotes": 1746,
  "authors": 717
}
```
<hr/>

## Error Managment

**Error Response**  
```ts
{
    // Language code
    error: number,
    function: string,
    description: string
}
```    

### Prerequisites  

* Node v16.13.1 or upper
* npm  v7.19.1 or upper

### Built With  
* [Visual Code Editor](https://code.visualstudio.com)  

### NPM Modules
npm install  

### Run
npm start

### Authors  

* **Giovanni Palleschi** - [gpalleschi](https://github.com/gpalleschi)  


### License

This project is licensed under the GNU GENERAL PUBLIC LICENSE 3.0 License - see the [LICENSE](LICENSE) file for details 