let Dishes = [
    {id: 1, name: "black pasta", price: 76, qty: 1243, title: "tasty black west "},
    {id: 2, name: "pizza", price: 40, qty: 678, title: "tasty food" },
    {id: 3, name: "tost", price: 35, qty: 1000, title: "great bread"},
    {id: 4, name: "belgi waffel", price: 83, qty: 34, title: "a lot of chocklet"}
]


const getAllDishes = (req,res)=>{
    res.status(200).send(Dishes);
}

const getDishById = (req,res)=>{
    const DishId = req.params.id;
    const foundDish = Dishes.find(u => u.id == DishId);

    if(foundDish){
        res.status(200).send({"I find >_<":foundDish});
    }
    else
       res.status(404).send('this Dish is not exsit')
}

const deletedDish = (req,res)=>{
    const id = req.params.id;
    console.log('id =>' ,id);
    
    Dishes = Dishes.filter(d=>d.id!=id);
    res.status(202).send(Dishes);
}

const AddDish = (req,res)=>{
    const newDish = req.body;
    newDish.id = Dishes.length + 1;

    Dishes.push(newDish);
    res.status(201).send({'welcome >_<' : newDish, 'all Dishes: ':Dishes})
}

const updateDish = (req,res)=>{
    const id = req.params.id;
    const index = Dishes.findIndex(d=>d.id == id);
    
    if(index != -1){
        Dishes[index] = {...Dishes[index],
                            name: req.body.name,
                            price: req.body.price,
                            qty: req.body.qty,
                            title: req.body.title};
        res.status(201).send({" update Dishes: ": Dishes[index]})
    }
    else{
        res.status(404).send('Dish not found');
    }
    
}























module.exports = {
    getAllDishes,
    getDishById,
    deletedDish,
    AddDish,
    updateDish
}