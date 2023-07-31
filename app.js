document.addEventListener('DOMContentLoaded', () =>{
    document.querySelector('.grid').innerHTML = '<div></div>'.repeat(200)
    let squares = Array.from(document.querySelectorAll('.grid div'))
    
    //Width of grid
    const width = 10
    // 4x4 Grid layout
    // 0 - 1 - 2 - 3
    // 10 - 11 - 12 - 13
    // 20 - 21 - 22 - 23
 
    const lShape = [
        //1st rotation 1-2-11-21
        [1, 2, width+1, width*2+1],

        //2nd rotation 10-11-12-22
        [width, width+1, width+2, width*2+2],

        //3rd rotation 1-11-20-21
        [1, width+1, width*2, width*2+1],

        //4th rotation 10-20-21-22
        [width, width*2, width*2+1, width*2+2]
    ]

    const zShape = [
        //1st rotation 11-12-20-21
        [width+1, width+2, width*2, width*2+1],

        //2nd rotation 0-10-11-21
        [0, width, width+1, width*2+1],

        //3rd rotation 11-12-20-21
        [width+1, width+2, width*2, width*2+1],

        //4th rotation 0-10-11-21
        [0, width, width+1, width*2+1]
    ]

    const tShape = [
        //1st rotation 1-10-11-12
        [1, width, width+1, width+2],

        //2nd rotation 1-11-12-21
        [1, width+1, width+2, width*2+1],

        //3rd rotation 10-11-12-21
        [width, width+1, width+2, width*2+1],

        //4th rotation 10-1-11-21
        [width, 1, width+1, width*2+1],
    ]

    const oShape = [
        //All rotations are the same
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]

    const iShape = [
        //1st rotation 1-11-21-31
        [1, width+1, width*2+1, width*3+1],
        //2nd rotation 10-11-12-13
        [width, width+1, width+2, width+3],
        //3rd rotation 1-11-21-31
        [1, width+1, width*2+1, width*3+1],
        //4th rotation 10-11-12-13
        [width, width+1, width+2, width+3]
    ]


    const shapeTypes = [lShape, zShape, tShape, oShape, iShape]

    let currentPosition = 0
    let current = shapeTypes[4][2]


    function draw(){
        current.forEach(index => {
            squares[currentPosition + index].classList.add('block')
        })
    }

    draw()


    //console.log(shapeTypes)

})
