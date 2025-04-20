import { getAll, create, validate, generateToken } from '../services/inscription.service.js';
import { buildSOAPInscription, buildSOAPInscriptionsResponse } from '../utils/soap-formatter.js';
import {
    BadRequestException,
    InternalServerErrorException,
} from '../utils/exceptions.js';

export const getAllInscriptions = async (req, res, next) => {
    try {
        const inscriptions = await getAll();
        const wantsXML = req.headers['accept']?.includes('xml');

        if (wantsXML) {
            res.set('Content-Type', 'text/xml');
            return res.send(buildSOAPInscriptionsResponse(inscriptions));
        }

        res.json(inscriptions);
    } catch (err) {
        next(new InternalServerErrorException('Failed to fetch inscriptions'));
    }
};

export const createInscription = async (req, res, next) => {

    const contentType = req.headers['content-type'] || ''

    let name, lastname, email
    let isXML = false
    try {
        if (contentType.includes('application/json')) {
            // ✅ JSON input
            const { name, lastname, email } = req.body;
            if (!name || !lastname || !email) {
                throw new BadRequestException('Missing required fields');
            }


        } else if (contentType.includes('xml')) {
            // ✅ XML input from SOAP envelope
            isXML = true
            const inscriptionNode =
                req.body?.['soapenv:envelope']?.['soapenv:body']?.[0]?.['inscriptionrequest']?.[0]

            console.log('inscriptionNode', inscriptionNode);

            email = inscriptionNode?.email?.[0]
            name = inscriptionNode?.name?.[0]
            lastname = inscriptionNode?.lastname?.[0]
        }
        const inscription = await create({ name, lastname, email });

        if (isXML) {
            res.set('Content-Type', 'text/xml')
            return res.send(buildSOAPInscription(inscription))
        }
        res.status(201).json(inscription);
    } catch (err) {
        next(err);
    }
};

export const validateInscription = async (req, res, next) => {

    try {
        const { id } = req.params;
        const result = await validate(id);
        const wantsXML = req.headers['accept']?.includes('xml');

        if (wantsXML) {
            res.set('Content-Type', 'text/xml');
            return res.send(`
                <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        <ValidateInscriptionResponse>
                            <message>${result.message}</message>
                        </ValidateInscriptionResponse>
                    </soap:Body>
                </soap:Envelope>
            `);
        }

        res.json(result);
    } catch (err) {
        next(err);
    }
};


export const generateBearerToken = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await generateToken(id);
        const wantsXML = req.headers['accept']?.includes('xml');

        if (wantsXML) {
            res.set('Content-Type', 'text/xml');
            return res.send(`
                <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        <GenerateBearerTokenResponse>
                            <message>${result.message}</message>
                            <bearer_token>${result.bearer_token}</bearer_token>
                        </GenerateBearerTokenResponse>
                    </soap:Body>
                </soap:Envelope>
            `);
        }

        res.json(result);
    } catch (err) {
        next(err);
    }
};

