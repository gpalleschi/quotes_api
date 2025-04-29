# quote_api
Quote API RESTful Node.js based Multilingual (Italian, English and Spanish) is a free, open source quote api to get random quote. Quotes are loaded on sqlite3 DB. Actually is hosted on [Vercel](https://quotes-api-three.vercel.app/api/).   

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

Return a random image with a quote and its author (To generate random image use pixabay service).

**Query parameters**  


| Param     | Type     | Description   | Mandatory                                                                                                                                                                                                                                                                                                                          |
| :-------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |---|
| language | `String`    | Language Code (ex. en, it, es) | Yes | 

**Response**

```ts
{
    // url image
    url: string
    // width image
    width : number
    // height image
    height : number
    // Author name
    author: string
    // Quote
    quote: string
}
```

**Examples**

`http://localhost:35907/api/randomimage?language=en`

```
{
    "url": "https://pixabay.com/get/g6e739078013913a6cc494f4fa619b28b40d3b74f8d631c9fa8454a20654f6a1cbf45b4117d180dd8ad0789664ca946d5cee9224be3de79b4c620d5bdafbf2179_640.jpg",
    "width" : 640,
    "height" : 426,
    "author": "Frida Kahlo",
    "quote": "Nada dura para siempre… por eso quiero que seas mi nada."
}
```
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
    // version
    version: string
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
  "version": "1.7.2",
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

* Node v22.14.0 or upper
* npm  v11.3.0 or upper

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