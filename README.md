# quote_api
Quote API RESTful Node.js based Multilingual (Italian, English and Spanish) is a free, open source quote api to get random quote. Quotes are loaded on sqlite3 DB. 

## API Reference

- [Get Random Quote](#Randomquote)  
- [Info](#Info)  
- [Authors](#Authors)  
- [Quotes](#Quotes)
- [Error Managment](#Error-Managment)


<hr/>

## Random quote

```HTTP
GET /randomquote
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

`http://localhost:35907/info?language=en`

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
GET /Info
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

`http://localhost:35907/authors?language=it&search=%OSCAR%`

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
GET /Info
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

`http://localhost:35907/quotes?language=en&author=%Goethe%`

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