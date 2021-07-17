/*
 * @Description: 用户模块控制器
 * @Author: hai-27
 * @Date: 2020-03-14 21:16:08
 * @LastEditors: hai-27
 * @LastEditTime: 2020-03-15 00:15:27
 */
const userDao = require('../models/dao/usersDao');
const { checkUserInfo, checkUserName } = require('../middleware/checkUserInfo');

module.exports = {
  /**
   * 用户登录
   * @param {Object} ctx
   */
  Login: async ctx => {

    let { userName, password } = ctx.request.body;

    // 校验用户信息是否符合规则
    if (!checkUserInfo(ctx, userName, password)) {
      return;
    }

    // 连接数据库根据用户名和密码查询用户信息
    let user = await userDao.Login(userName, password);
    // 结果集长度为0则代表没有该用户
    if (user.length === 0) {
      ctx.body = {
        code: '004',
        msg: '用户名或密码错误'
      }
      return;
    }

    // 数据库设置用户名唯一
    // 结果集长度为1则代表存在该用户
    if (user.length === 1) {

      const loginUser = {
        user_id: user[0].user_id,
        userName: user[0].userName
      };
      // 保存用户信息到session
      ctx.session.user = loginUser;

      ctx.body = {
        code: '001',
        user: loginUser,
        msg: '登录成功'
      }
      return;
    }

    //数据库设置用户名唯一
    //若存在user.length != 1 || user.length!=0
    //返回未知错误
    //正常不会出现
    ctx.body = {
      code: '500',
      msg: '未知错误'
    }
  },
  /**
   * 查询是否存在某个用户名,用于注册时前端校验
   * @param {Object} ctx
   */
  FindUserName: async ctx => {
    let { userName } = ctx.request.body;

    // 校验用户名是否符合规则
    if (!checkUserName(ctx, userName)) {
      return;
    }
    // 连接数据库根据用户名查询用户信息
    let user = await userDao.FindUserName(userName);
    // 结果集长度为0则代表不存在该用户,可以注册
    if (user.length === 0) {
      ctx.body = {
        code: '001',
        msg: '用户名不存在，可以注册'
      }
      return;
    }

    //数据库设置用户名唯一
    //结果集长度为1则代表存在该用户,不可以注册
    if (user.length === 1) {
      ctx.body = {
        code: '004',
        msg: '用户名已经存在，不能注册'
      }
      return;
    }

    //数据库设置用户名唯一，
    //若存在user.length != 1 || user.length!=0
    //返回未知错误
    //正常不会出现
    ctx.body = {
      code: '500',
      msg: '未知错误'
    }
  },
  Register: async ctx => {
    let { userName, password } = ctx.request.body;

    // 校验用户信息是否符合规则
    if (!checkUserInfo(ctx, userName, password)) {
      return;
    }
    // 连接数据库根据用户名查询用户信息
    // 先判断该用户是否存在
    let user = await userDao.FindUserName(userName);

    if (user.length !== 0) {
      ctx.body = {
        code: '004',
        msg: '用户名已经存在，不能注册'
      }
      return;
    }

    try {
      // 连接数据库插入用户信息
      let registerResult = await userDao.Register(userName, password);
      // 操作所影响的记录行数为1,则代表注册成功
      if (registerResult.affectedRows === 1) {
        ctx.body = {
          code: '001',
          msg: '注册成功'
        }
        return;
      }
      // 否则失败
      ctx.body = {
        code: '500',
        msg: '未知错误，注册失败'
      }
    } catch (error) {
      reject(error);
    }
  }
};