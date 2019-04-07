$ = typeof($) != "undefined" ? $ : jQuery;


function _base64ToArrayBuffer(base64) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}



class Smbpl_bt {
    /**
     *
     * Struct of smbpl file
     * @param {ArrayBuffer} arrbuffer - smbpl_bt file
     */
    constructor(arrbuffer) {
        var point = 4;

        this.numControl = Int32Array(arrbuffer.slice(point,point+4))[0];point+=4;

        this.controlentr = (function () {
            var rep = [];

            var repObj = {};

            repObj.vector = {
                x:Int32Array(arrbuffer.slice(point,point+4))[0],
                y:Int32Array(arrbuffer.slice(point+4,point+4+4))[0],
                z:Int32Array(arrbuffer.slice(point+4+4,point+4+4+4))[0],
            };point+=(4+4+4);

            repObj.Numberblk = Int32Array(arrbuffer.slice(point,point+4))[0];point+=4;

            //     ---------------

            

        })();
    }
}

class Smbph_bt {
    /**
     *
     * @param {ArrayBuffer} arrbuffer - smbph_bt file
     */
    constructor(arrbuffer) {
        var point = 4;

        this.type = Int32Array(arrbuffer.slice(point,point+4))[0]; point +=4

        this.vector1 = {
            x:Int32Array(arrbuffer.slice(point,point+4))[0],
            y:Int32Array(arrbuffer.slice(point+4,point+4+4))[0],
            z:Int32Array(arrbuffer.slice(point+4+4,point+4+4+4))[0]
        };point+=(4+4+4);

        this.vector2 = {
            x:Int32Array(arrbuffer.slice(point,point+4))[0],
            y:Int32Array(arrbuffer.slice(point+4,point+4+4))[0],
            z:Int32Array(arrbuffer.slice(point+4+4,point+4+4+4))[0]
        };point+=(4+4+4);
        this.blockentry = [];
        this.NumberBlock = Int32Array(arrbuffer.slice(point,point+4))[0];
        var actPoint = point;
        while(actPoint + this.NumberBlock != point) {
            this.blockentry.push({
                id:Int16Array(arrbuffer.slice(point,point+2))[0],
                quant:Int32Array(arrbuffer.slice(point+2,point+2+4))[0],
            });
            point += (2+4);
        }
    }
}

 class Smd3_bt {

     /**
      *
      * Struct the smd3 file
      * @param {ArrayBuffer} arrbuffer - smd3_bt file
      */
    constructor(arrbuffer) { console.log(arrbuffer);
        this.Header = {
            SegmentIndex:[{ // 16*16*16
                segmentId:undefined, //int16
                segmentSize:undefined //int16
            }]

        };

        this.data = [{ // [ ( FileSize() - 16388 ) / 49152 ]
            version:undefined, // byte
            timestamp:undefined, // int64
            segmentPosition: {
                x:undefined, // int32
                y:undefined,
                z:undefined
            },
            dataByte:undefined, // unsigned byte (if 1 : valid)
            compressedSize:undefined, // int
            data : [undefined] // byte [49152-26] zlib compressed array of (32x32x32) BlockData
                                // 0-10 : bloc id
                                // 11-17 hit point
                                // 18 active (bool)
                                // 19-23 orientation
                                // 23-end type
                                    // Orientation : https://starmadepedia.net/wiki/Blueprint_File_Format_Block_Data#Segment-data_v3
        }];

        var Point = 0;
        this.Header.version = new Int32Array(arrbuffer.slice(Point,Point+4));Point+=4;

        this.Header.SegmentIndex = (function() {
            var ind = [];

            while(!(ind.length == (16*16*16))) {
                ind.push({
                    segmentId:new Int16Array(arrbuffer.slice(Point,Point+2))[0],
                    segmentSize:new Int16Array(arrbuffer.slice(Point+2,Point+2+2))[0]
                });
                Point += 4;
            }

            return ind;

        })();

        this.data = (function() {
            var rep = [];
            var i = 0;
            while(i<= (arrbuffer.byteLength - 16388)/49152) {
                var obj = {};
                obj.version = new Int8Array(arrbuffer.slice(Point,Point+1))[0];Point+=1;i+=1;
                obj.timestamp = new BigInt64Array(arrbuffer.slice(Point,Point+8))[0];Point+=8;i+=8;
                obj.segmentPosition = {
                    x:new Int32Array(arrbuffer.slice(Point,Point+4))[0],
                    y:new Int32Array(arrbuffer.slice(Point+4,Point+4+4))[0],
                    z:new Int32Array(arrbuffer.slice(Point+4+4,Point+4+4+4))[0]
                };Point+=(4+4+4);i+=(4+4+4);
                obj.dataByte = new Int8Array(arrbuffer.slice(Point,Point+1))[0];Point+=1;i+=1;
                obj.compressedSize = new Int32Array(arrbuffer.slice(Point,Point+4))[0];Point+=4;i+=4;

                obj.data = arrbuffer.slice(Point);
                /*obj.data = (function () {
                    var rep = [];

                    for(var i=0; i<4096;i++) {
                        rep.push(arrbuffer.slice(Point,Point+1));
                        Point++;
                    };

                    return rep;
                })()*/

                rep.push(obj);

            };
            return rep;
        })();





    }
}




