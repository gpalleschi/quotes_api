# quote_api
Quote API RESTful Node.js based Multilingual (Italian, English and Spanish) is a free, open source quote api to get random quote. Quotes are loaded on sqlite3 DB. 

## API Reference

- [Get Random Quote](#Random)  
- [Get Random Quote Image](#RandomImage)  
- [Info](#Info)  
- [Authors](#Authors)  
- [Quotes](#Quotes)
- [Error Managment](#Error-Managment)

<hr/>

## Random

```HTTP
GET /api/randomquote
```

Return a random quote.

**Query parameters**  


| Param     | Type     | Description   | Mandatory                                                                                                                                                                                                                                                                                                                          |
| :-------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |---|
| language | `String`    | Language Code (ex. en, it, es) | Yes | 

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

`http://localhost:35907/api/randomquote?language=en`

```
{
  "quote": "Three things cannot be long hidden: the sun, the moon, and the truth.",
  "author": "Buddha",
  "tags": "famous"
}
```
<hr/>

## RandomImage

```HTTP
GET /api/randomimage
```

Return a random image with a quote.

**Query parameters**  


| Param     | Type     | Description   | Mandatory                                                                                                                                                                                                                                                                                                                          |
| :-------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |---|
| language | `String`    | Language Code (ex. en, it, es) | Yes | 
| newmode | `String`    | If present and its value is different from no show random image from https://random.imagecdn.app | No | 

**Response**

An image in html format.

**Examples**

`http://localhost:35907/api/randomimage?language=en`


<img src="./images/ExampleRandomImage.png" alt="ExampleRandomImage" style="height: 30%; width:30%;"/>
<hr/>

## Info

```HTTP
GET /api/Info
```

Return info about total quotes and authors.

**Query parameters**  

| Param     | Type     | Description   | Mandatory                                                                                                                                                                                                                                                                                                                          |
| :-------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |---|
| language | `String`    | Language Code (ex. en, it, es) | Yes | 

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

`http://localhost:35907/api/info?language=en`

```
{
  "language": "en",
  "quotes": 1746,
  "authors": 717
}
```

<hr/>

## Authors

```HTTP
GET /api/authors
```

Return list of Authors with relative total quotes.

**Query parameters**  

| Param     | Type     | Description   | Mandatory                                                                                                                                                                                                                                                                                                                          |
| :-------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |---|
| language | `String`    | Language Code (ex. en, it, es) | Yes | 
| search | `String`    | String to research Author in like sql format (ex. %Goethe%) | No | 

**Response**  

```ts
{
    // Author Name
    author: string
    // Total quotes loaded
    totQuotes: number
}
```
**Examples**

`http://localhost:35907/api/authors?language=it&search=%OSCAR%`

```
[
  {
    "author": "Oscar Wilde",
    "totQuotes": 91
  }
]
```

<hr/>

## Quotes  

```HTTP
GET /api/quotes
```

Return list of quotes of an author.

**Query parameters**  

| Param     | Type     | Description   | Mandatory                                                                                                                                                                                                                                                                                                                          |
| :-------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |---|
| language | `String`    | Language Code (ex. en, it, es) | Yes | 
| author | `String`    | String to research Author in like sql format (ex. %Goethe%) | Yes | 
| limit | `Numeric`    | Limit quotes extracted (Default value is 10) | No | 

**Response**  

```ts
{
    // Total quotes founded
    totQuotes: number
    quotes: array<{
        // Quote
        quote: string
        // Author name
        author: string
        // tags
        tags: string      
    }>
}
```
**Examples**

`http://localhost:35907/api/quotes?language=en&author=%Obama%`

```
{
  "totQuotes": 6,
  "quotes": [
    {
      "quote": "If you're walking down the right path and you're willing to keep walking, eventually you'll make progress.",
      "author": "Barack Obama",
      "tags": "famous"
    },
    {
      "quote": "Focusing your life solely on making a buck shows a poverty of ambition. It asks too little of yourself. And it will leave you unfulfilled.",
      "author": "Barack Obama",
      "tags": "famous"
    },
    {
      "quote": "Change will not come if we wait for some other person or some other time. We are the ones weve been waiting for. We are the change that we seek.",
      "author": "Barack Obama",
      "tags": "famous"
    },
    {
      "quote": "Change will not come if we wait for some other person or some other time. We are the ones weve been waiting for. We are the change that we seek.",
      "author": "Barack Obama",
      "tags": "famous"
    },
    {
      "quote": "Focusing your life solely on making a buck shows a poverty of ambition. It asks too little of yourself. And it will leave you unfulfilled.",
      "author": "Barack Obama",
      "tags": "famous"
    },
    {
      "quote": "If you're walking down the right path and you're willing to keep walking, eventually you'll make progress.",
      "author": "Barack Obama",
      "tags": "famous"
    }
  ]
}
```

<hr/>

## Error Managment

**Error Response**  
```ts
{
    // Language code
    error: number,
    // Function Name
    function: string,
    // Description error
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