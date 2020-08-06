require('./node_wrapper');
const sdk = require('../index');

(async () => {
  try {
    const allUsers = await sdk.getUsers()
    console.log(allUsers);
    //
    let user = await sdk.localLogin();
    if (!user) {
      console.log('failed to localLogin, do online login');
      //
      user = await users.onlineLogin('as.wiz.cn', 'xxx@xxx.xxx', 'xxxxxx');
      //
    } else {
      console.log('localLogin done');
      console.log(user);
    }
    //
  } catch (err) {
    console.error(err);
  }

})();
