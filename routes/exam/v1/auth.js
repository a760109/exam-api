const express = require('express');
const router = express.Router();
const { asyncMiddleware } = require('../../common');
const AuthService = require('../../../services/auth');
const _ = require('lodash');

/**
 * @swagger
 * /exam/v1/auth/auth0:
 *   post:
 *     tags:
 *       - auth
 *     summary: "[Web] Verify Auth0 toekn"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idToken:
 *                 type: string
 *                 description: Auth0 token
 *             example:
 *               idToken: xxxxxxx
 *             required:
 *               - idToken
 *     responses:
 *       default:
 *         $ref: "#/components/responses/Default"
 */
router.post(
  '/auth0',
  asyncMiddleware(async function (req) {
    if (req.body && !_.isEmpty(req.body.idToken)) {
      return await AuthService.getUserDetailsByAuth0(req.body.idToken);
    }
  }),
);

module.exports = router;
