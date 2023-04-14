array = ["animal_migration", "vase", "violin", "washing machine", "watermelon", "waterslide", "whale", "wheel", "windmill", "wine bottle", "truck", "trumpet", "aircraft carrier", "airplane", "alarm clock", "ambulance", "van", "umbrella", "underwear", "arm", "asparagus", "axe", "backpack", "banana", "beard", "bed", "angel", "ant", "anvil", "apple", "wine glass", "wristwatch", "yoga", "zebra", "zigzag", "trombone", "flower", "flying saucer", "foot", "fork", "frog", "frying pan", "garden", "garden hose", "giraffe", "goatee", "golf club", "grapes", "grass", "guitar", "hamburger", "hammer", "hand", "harp", "hat", "headphones", "hedgehog", "bandage", "barn", "baseball", "baseball bat", "basket", "basketball", "bat", "bathtub", "beach", "bear", "diving board", "dog", "dolphin", "donut", "door", "dragon", "dresser", "drill", "drums", "duck", "dumbbell", "ear", "elbow", "elephant", "envelope", "eraser", "eye", "eyeglasses", "face", "fan", "feather", "fence", "finger", "fire hydrant", "fireplace", "firetruck", "fish", "flamingo", "flashlight", "flip flops", "floor lamp", "candle", "cannon", "canoe", "car", "carrot", "castle", "cat", "ceiling fan", "cello", "cell phone", "chair", "chandelier", "church", "circle", "clarinet", "clock", "cloud", "coffee cup", "compass", "computer", "cookie", "cooler", "couch", "cow", "crab", "crayon", "crocodile", "crown", "cruise ship", "cup", "diamond", "dishwasher", "bee", "belt", "bench", "bicycle", "binoculars", "bird", "birthday cake", "blackberry", "blueberry", "book", "boomerang", "bottlecap", "bowtie", "bracelet", "brain", "bread", "bridge", "broccoli", "broom", "bucket", "bulldozer", "bus", "bush", "butterfly", "cactus", "cake", "calculator", "calendar", "camel", "camera", "camouflage", "campfire", "helicopter", "helmet", "hexagon", "hockey puck", "hockey stick", "horse", "hospital", "hot air balloon", "hot dog", "hot tub", "hourglass", "house", "house plant", "hurricane", "ice cream", "jacket", "jail", "kangaroo", "key", "keyboard", "knee", "knife", "ladder", "lantern", "laptop", "leaf", "leg", "light bulb", "lighter", "lighthouse", "lightning", "line", "lion", "lipstick", "lobster", "lollipop", "mailbox", "map", "marker", "matches", "megaphone", "mermaid", "microphone", "microwave", "monkey", "moon", "mosquito", "motorbike", "mountain", "mouse", "moustache", "mouth", "mug", "mushroom", "nail", "necklace", "nose", "ocean", "octagon", "octopus", "onion", "oven", "owl", "paintbrush", "paint can", "palm tree", "panda", "pants", "paper clip", "parachute", "parrot", "passport", "peanut", "pear", "peas", "pencil", "penguin", "piano", "pickup truck", "picture frame", "pig", "pillow", "pineapple", "pizza", "pliers", "police car", "pond", "pool", "popsicle", "postcard", "potato", "power outlet", "purse", "rabbit", "raccoon", "radio", "rain", "rainbow", "rake", "remote control", "rhinoceros", "rifle", "river", "roller coaster", "rollerskates", "sailboat", "sandwich", "saw"]


timer_counter = 0;
timer_check = "";
sketchname = "";
answer_holder = "";
score = 0;

random = Math.floor((Math.random() * array.length) + 1);

element = array[random];
document.getElementById("draw").innerHTML = "Sketch To Be Drawn: " + element;

console.log(element)

function setup() {
    canvas = createCanvas(400, 350)
    canvas.center()
    background("white")


    canvas.mouseReleased(classifyCanvas)
}

function preload() {
    classifier = ml5.imageClassifier("DoodleNet")
}

function draw() {
    strokeWeight(7)

    stroke("black")
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY)
    }

    check_sketch()

    if (element == sketchname) {
        answer_holder = "set"
        score++
        document.getElementById("score").innerHTML = "📃 SCORE: " + score
    }

    else{
        document.getElementById("failed").innerHTML="Try, Try Dont Cry! 👍"
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResults)
}

function gotResults(error, results) {
    if (error) {
        console.error(error)
    }
    console.log(results)

    sketchname = results[0].label
    confidence = Math.round(results[0].confidence * 100)
    document.getElementById("label").innerHTML = "Your Sketch: " + sketchname
    document.getElementById("confidence").innerHTML = "Confidence: " + confidence + "%"

}

function check_sketch() {
    timer_counter++
    document.getElementById("timer").innerHTML = "⏱️ TIMER: " + timer_counter

    if (timer_counter > 500) {
        timer_counter = 0
        timer_check = "completed"
    }

    if (answer_holder == "set" || timer_check == "completed") {
        timer_check = ""
        answer_holder = ""

        updateCanvas()
    }
}

function updateCanvas() {
    background("white")

    random = Math.floor((Math.random() * array.length) + 1);

    element = array[random];
    document.getElementById("draw").innerHTML = "Sketch To Be Drawn: " + element;
}