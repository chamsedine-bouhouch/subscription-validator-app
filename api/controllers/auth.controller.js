import { generateToken } from '../utils/generate-token.js'
import { authenticateUser } from '../services/auth.service.js'
import { BadRequestException } from '../utils/exceptions.js'

export const login = async (req, res) => {
  const contentType = req.headers['content-type'] || ''

  let email, password
  let isXML = false

  try {
    if (contentType.includes('application/json')) {
      // ✅ JSON input
      ({ email, password } = req.body)
    } else if (contentType.includes('xml')) {
      // ✅ XML input from SOAP envelope
      isXML = true
      const loginNode =
        req.body?.['soapenv:envelope']?.['soapenv:body']?.[0]?.['loginrequest']?.[0]

        console.log('loginNode', loginNode);
        

      email = loginNode?.email?.[0]
      password = loginNode?.password?.[0]
    } else {
      return res.status(415).send('Unsupported Content-Type')
    }

    if (!email || !password) {
      throw new BadRequestException('Email and password are required')
    }

    const user = await authenticateUser(email, password)
    const token = generateToken(user)

    if (isXML) {
      res.set('Content-Type', 'text/xml')
      return res.send(`
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <LoginResponse>
              <token>${token}</token>
              <user>
                <id>${user.id}</id>
                <name>${user.name || ''}</name>
                <email>${user.email}</email>
                <role>${user.role}</role>
              </user>
            </LoginResponse>
          </soap:Body>
        </soap:Envelope>
      `)
    }

    // ✅ JSON response
    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (err) {
    if (isXML) {
      res.set('Content-Type', 'text/xml')
      return res.status(400).send(`
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <Fault>
              <faultcode>soap:Client</faultcode>
              <faultstring>${err.message}</faultstring>
            </Fault>
          </soap:Body>
        </soap:Envelope>
      `)
    } else {
      throw err // Let global error handler deal with it
    }
  }
}
