# Utilities for Seamless Immutable

[ ![Codeship Status for Versent/siu](https://codeship.com/projects/06a046b0-284e-0133-8c7f-4ecd95a2c0b9/status?branch=master)](https://codeship.com/projects/97649)

## Install

```
npm install siu --save-dev
```

## Dependencies

```
npm install lodash --save-dev
npm install node-uuid --save-dev
npm install seamless-immutable --save-dev
```

## API

### Arrays

#### a.addCIds

Add a client generated id

```
items = siu.a.addCIds(items, 'cid');
```

#### a.merge

Merges two arrays

- Existing records are replaced in place
- New records added to the end

```
var newItems = siu.a.merge(items, moreItems, 'id');
```


