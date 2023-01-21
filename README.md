[![npm version](https://badge.fury.io/js/mongoose-simple-pager.png)](https://badge.fury.io/js/mongoose-simple-pager)
[![Coverage Status](https://coveralls.io/repos/github/0x3zra/mongoose-simple-pager/badge.svg?branch=master)](https://coveralls.io/github/0x3zra/mongoose-simple-pager?branch=master)
[![CI]](https://img.shields.io/github/actions/workflow/status/0x3zra/mongoose-simple-pager/node.js.yml) 
# mongoose-simple-pager

Pagination plugin for [mongoose.js](http://mongoosejs.com/).

## Requirements

- [NodeJS](https://nodejs.org/en/) >= 6.0

## Installation

```bash
$ npm install mongoose-simple-pager
```

## Example usage

```javascript
// userModel.js
import mongoose from "mongoose";
import paginate from "mongoose-simple-pager";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  roles: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "roles",
    },
  ],
});

userSchema.plugin(paginate);
```

```js
// controller.js
const User = mongoose.model("userModel");

const options = {
  limit: 5,
  page: 1,
};

return await User.paginate(options);
```

### Output will be:

```json
{
  "data": [
    {
      "obj1": {...}
    },
    {
      "obj2": {...}
    },
    {
      "obj3": {...}
    },
    {
      "obj4": {...}
    },
    {
      "obj5": {...}
    }
  ],
  "pagination": {
    "total": 123
  }
}
```

### Adding a query and populate options

```javascript
const User = mongoose.model("userModel");

const options = {
  limit: 5,
  page: 1,
};

const query = {
  $or: [
    {
      userName: {
        $regex: "x",
        $options: "i",
      },
    },
  ],
};

return await User.paginate(options, "roles", query);
```

## Todo
* Accept aggregate queries
* Migrate to typescript

## Contributing

1. Fork it ( https://github.com/0x3zra/mongoose-simple-pager/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## License

The MIT License (MIT)
