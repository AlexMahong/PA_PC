/*
Navicat MySQL Data Transfer

Source Server         : 百度云
Source Server Version : 50724
Source Host           : 106.12.26.224:3306
Source Database       : personalaccount

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2018-12-25 21:46:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for records
-- ----------------------------
DROP TABLE IF EXISTS `records`;
CREATE TABLE `records` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `createTime` datetime NOT NULL,
  `money` int(10) NOT NULL COMMENT '金额',
  `transaction` varchar(5) NOT NULL COMMENT '支出|收入/out|in',
  `type` varchar(10) NOT NULL COMMENT '消费类型',
  `transactionTime` datetime DEFAULT NULL COMMENT '交易时间',
  `notes` varchar(255) NOT NULL COMMENT '备注',
  `userID` int(5) NOT NULL COMMENT '关联用户ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of records
-- ----------------------------
INSERT INTO `records` VALUES ('12', '2018-12-17 11:49:52', '200', 'out', '食', '2018-12-17 11:49:10', '', '1');
INSERT INTO `records` VALUES ('13', '2018-12-17 23:32:43', '38', 'out', '食', '2018-12-17 23:32:23', '', '1');
INSERT INTO `records` VALUES ('14', '2018-12-19 07:50:54', '21', 'out', '食', '2018-12-18 08:00:00', '', '1');
INSERT INTO `records` VALUES ('15', '2018-12-20 12:18:08', '61', 'out', '行', '2018-12-19 08:00:00', '', '1');
INSERT INTO `records` VALUES ('16', '2018-12-20 12:18:59', '10', 'out', '食', '2018-12-19 08:00:00', '', '1');
INSERT INTO `records` VALUES ('17', '2018-12-20 18:57:32', '2164', 'out', '住', '2018-12-20 18:53:18', '', '1');
INSERT INTO `records` VALUES ('18', '2018-12-20 18:57:38', '2164', 'out', '住', '2018-12-20 18:53:18', '', '1');
INSERT INTO `records` VALUES ('19', '2018-12-21 08:50:46', '51', 'out', '食', '2018-12-20 08:00:00', '', '1');
INSERT INTO `records` VALUES ('20', '2018-12-21 09:26:27', '9', 'out', '食', '2018-12-21 09:26:04', '', '1');

-- ----------------------------
-- Table structure for types
-- ----------------------------
DROP TABLE IF EXISTS `types`;
CREATE TABLE `types` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `type` varchar(15) CHARACTER SET utf8 NOT NULL,
  `createBy` int(5) NOT NULL COMMENT '创建人ID',
  `createTime` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '创建时间',
  `remarks` varchar(50) CHARACTER SET utf8 DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of types
-- ----------------------------
INSERT INTO `types` VALUES ('4', '食', '1', '2018-12-15 13:40:20', '');
INSERT INTO `types` VALUES ('5', '行', '1', '2018-12-15 13:40:30', '');
INSERT INTO `types` VALUES ('6', '购物', '1', '2018-12-16 23:32:50', '');
INSERT INTO `types` VALUES ('7', '社交', '1', '2018-12-16 23:33:09', '');
INSERT INTO `types` VALUES ('8', '娱乐', '1', '2018-12-16 23:33:16', '');
INSERT INTO `types` VALUES ('9', '学习', '1', '2018-12-16 23:33:30', '');
INSERT INTO `types` VALUES ('10', '衣', '1', '2018-12-16 23:34:21', '');
INSERT INTO `types` VALUES ('11', '住', '1', '2018-12-16 23:34:27', '');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(5) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `userName` varchar(10) NOT NULL DEFAULT '',
  `account` varchar(20) NOT NULL COMMENT '用户登录账户',
  `password` varchar(50) NOT NULL COMMENT '登录密码',
  `tel` varchar(20) DEFAULT NULL COMMENT '电话',
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'Mr.Shen', 'shen', '7436', null, null);
INSERT INTO `user` VALUES ('2', 'ceshi', 'ceshi', '123', '1', '1');
INSERT INTO `user` VALUES ('3', 'ceshi', 'ceshi', '123', '', '');