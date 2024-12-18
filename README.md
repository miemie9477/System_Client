# 12/18 memo
1.  *CartPage.js* <br/>
    [ ] 購物車頁面(*CartBody.js* )已回傳購物車商品，要放上畫面<br/>
2. *AllOrdersBody.js* <br/>
    [ ] 把明細放到底下<br/>
    [ ] 小計(*sum*)要改狀態<br/>
    > 我把**所有backend底下表格map的部分**，把id改成orderNum<br/>
3. *AwaitPaymentBody.js*<br/>
    [ ] 底下明細expandrows要放detail<br/>
    [ ] 小計(*sum*)要改狀態<br/>
    [x] **待付款**的訂單，**後端**只會回傳*payState=0 & tState=0*的訂單，所以只要做 encoding就好<br/>
    > 執行*PaymentHandler()* 重新呼叫一次*getRows()*(從後端提取已修改的*rows*)，畫面重新渲染訂單資料(rows)，不用再改狀態<br/>
4. *AwaitDeliveryPage.js*<br/>
    [ ] 底下明細expandrows要放detail<br/>
    [ ] 小計(*sum*)要改狀態<br/>
    [x] **待出餐**的訂單，**後端**只會回傳*payState=1 & tState=0*的訂單，所以只要做 encoding就好<br/>
    > 執行*DeliveryHandler()* 重新呼叫一次*getRows()*(從後端提取已修改的*rows*)，畫面重新渲染訂單資料(rows)，不用再改狀態<br/>
5. *DonePage.js*<br/>
    [ ] 底下明細expandrows要放detail<br/>
    [ ] 小計(*sum*)要改狀態<br/>
    [x] **待出餐**的訂單，**後端**只會回傳*payState=1 & tState=0*的訂單，所以只要做 encoding就好<br/>
    > 執行*RefundHandler()* 重新呼叫一次*getRows()*(從後端提取已修改的*rows*)，畫面重新渲染訂單資料(rows)，不用再改狀態
6. *LoginBox.js* <br/>
    [ ] 已完成,登入狀態驗證<br/>
7. 新增 *CheckMember* & *CheckMenu*資料夾，API已寫入(沒debug過)有問題再跟我說<br/>

================<br/>

## Library
> React.js
> React.bootstrap
> react-router-dom (npm install react-router-dom) 
> npm install react-icons
> npm install js-cookie
> npm install react-hook-form
> npm install axios

<hr>

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
