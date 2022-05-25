// import css from "file.css";
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            // loader: 'url-loader',
            // options: {
            //     limit: 8000,
            //     name: 'images/[hash]-[name].[ext]'
            // },
            loader: "file-loader?name=/static/images/[name].[ext]",
            options: {
              limit: 100000,
            },
          },
        ]
      },
      // {
      //   test : /\.(png|jpg)$/,
      //   exclude: /(node_modules)/,
      //   use:{
      //     loader : 'file-loader',
      //   }
      // }
    ],
    // loaders: [
    //   { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
    // ]
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify("development"),
        // NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
};

// plugins: [
//   new webpack.DefinePlugin({
//     "process.env": {
//       // This has effect on the react lib size
//       NODE_ENV: JSON.stringify("development"),
//       // NODE_ENV: JSON.stringify("production"),
//     },
//   }),
// ],

// module.exports = {
//   module: {
//     rules: [
//       {
//         test: /\.css$/i,
//         use: ["style-loader", "css-loader"],
//       },
//     ],
//   },
// };

// f you are running "npm run dev", 
// keep the JSON.stringify("development"), 
// if you are running "npm run build" ,
// change it to JSON.stringify("production"). 
// Basically, match it to the type of mode you are running.