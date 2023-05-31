import {inject} from '@loopback/core';
import {
  get,
  HttpErrors,
  oas,
  param,
  post, Request,
  requestBody,
  Response,
  RestBindings
} from '@loopback/rest';
import path from 'path';
import {promisify} from 'util';
import fs from 'fs';
import multer from 'multer';
const readdir = promisify(fs.readdir);
import { GeneralConfig } from '../config/general.config';
const parentDir = path.join(__dirname, '../../');
console.log(parentDir)

export class FileManagerController {
  constructor() {}


  @post('up-image-property', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object'
            },
          },
        },
        description: 'file to upload',
      },
    },
  })
  async cargarArchivoProperty(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<Object | false> {

    const filePath = path.join(parentDir, GeneralConfig.PathImagenesProperty);
    let res = await this.StoreFileToPath(
      filePath,
      GeneralConfig.campoDeProducto,
      request,
      response,
      GeneralConfig.extensionesImagenes,
    );
    if (res) {
      const filename = response.req?.file?.filename;
      if (filename) {
        return {file: filename};
      }
    }
    return res;
  }


  private GetMulterStorageConfig(path: string) {
    var filename: string = '';
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path);
      },
      filename: function (req, file, cb) {
        filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
      },
    });
    return storage;
  }

  /**
   *
   */

  private StoreFileToPath(
    storePath: string,
    fieldname: string,
    request: Request,
    response: Response,
    acceptedExt: string[],
  ): Promise<object> {

    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      const upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
          var ext = path.extname(file.originalname).toUpperCase();

          if (acceptedExt.includes(ext)) {
            return callback(null, true);
          }
          return callback(
            new HttpErrors[400]('this format file is not supported.'),
          );
        },
        limits: {},
      }).single(fieldname);
      upload(request, response, (err: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }


  /**
   * file download
   */
  @get('/archivos/{type}', {
    responses: {
      200: {
        content: {
          // string []
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
        description: 'a list of files',
      },
    },
  })
  async obtenerListaArchivos(@param.path.number('type') type: number): Promise<string[]> {
    const folderPath = this.obtenerArchivosTipo(type);
    const files = await readdir(folderPath);
    return files;
  }

  @get('/obtenerArchivo/{type}/{name}')
  @oas.response.file()
  async downloadFileByName(
    @param.path.number('type') type: number,
    @param.path.string('name') name: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    console.log("Hol2")

    const folder = this.obtenerArchivosTipo(type);
    const file = this.validarNombreArchivo(folder,  name);
    response.download(file, name);
    return response;
  }

  /**Get the folder when files are uploaded by type */

  private obtenerArchivosTipo(tipo: number) {
    let filePath = '';
    console.log("Hola1")
    switch (tipo) {
      //amusement
      case 1:

        filePath = path.join(parentDir, GeneralConfig.PathImagenesProperty);

        break;
      case 2:
        filePath = path.join(parentDir, GeneralConfig.PathImagenesProperty);
      case 3:
        break;
    }
    return filePath;
  }

  private validarNombreArchivo(folder: string, fileName: string) {
    const resolved = path.resolve(folder, fileName);
    if (resolved.startsWith(folder)) return resolved;

    throw new HttpErrors[400](`Archivo invalido: ${fileName}`);
  }




}
