const mongoose = require("mongoose");
const express=require('express')
const bodyparser=require('body-parser');
const port=4500;
const hostname='localhost';
const encoder=bodyparser.urlencoded();
const app=express();
app.use('/css', express.static('css'));
app.use('/images', express.static('images'));
app.use('/js', express.static('js'));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));
//mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/wt', {useNewUrlParser: true})
    .then(() => {
        console.log('Connected Successfully!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });   
/////////////////////////////////////////////SCHEMAS////////////////////////////////////////////////////////////////////
//login Schema
const loginSchema = new mongoose.Schema({
        Email: String,
        Password:String,
 });
//user Schema
const userSchema= new mongoose.Schema({
    User_name:String,
    Mobile_Number:String,
    User_email:String,
    User_gender:String,
    User_Username:String,
    User_Password:String,
    User_Role:String,
});
//customer Schema
const customerSchema =new mongoose.Schema({
    Customer_Name:String,
    Customer_Group:String,
    Customer_Mobile_Number:String,
    Customer_Email:String,
    Customer_Country:String,
    Customer_City:String,
    Customer_Address:String,
    Customer_Zipcode:String,
});
//supplier Schema
const supplierSchema=new mongoose.Schema({
    Supplier_Name:String,
    Supplier_Mobile_Number:String,
    Supplier_Email:String,
    Supplier_Country:String,
    Supplier_City:String,
    Supplier_Address:String,
    Supplier_Zipcode:String,
    Supplier_Company:String,
    Supplier_Code:String,
});
//addproduct Schema
const addproductSchema=new mongoose.Schema({
    Product_Name:String,
    Product_Category:String,
    Product_Cost:String,
    Product_Stock:String,
    Product_Total:String,
});
//purchase Schema
const purchaseSchema=new mongoose.Schema({
    Purchase_Date:String,
    Purchase_House:String,
    Purchase_Supplier:String,
    Purchase_Name:String,
    Purchase_Quantity:String,
    Purchase_Cost:String,
    Purchase_Payment:String,
});
//newsale Schema
const newsaleSchema=new mongoose.Schema({
    Sale_Date:String,
    Sale_WareHouse:String,
    Sale_Biller:String,
    Sale_Customer:String,
    Sale_Shipment:String,
    Sale_Status:String,
    Sale_Payment:String,
});
const warehouseSchema=new mongoose.Schema({
    Warehouse_Name:String,
    Warehouse_Select:String,
    Warehouse_Incharge_Id:String,
    Warehouse_Incharge:String,
    Warehouse_Incharge_Mobile:String,
    Warehouse_Incharge_Email:String,
    Warehouse_Incharge_Gender:String,
    Warehouse_Location:String,
    Warehouse_Country:String,
    Warehouse_City:String,
    Warehouse_Address:String,
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//get login.html
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/login.html");
})
//post login
app.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    console.log(email, password);
    const Login = mongoose.model("logins", loginSchema);
  
    Login.findOne({ Email: email, Password: password })
      .then((user) => {
        if (!user) {
          console.log("User Not Found! Please Register Yourself");
          res.render('login', { error: "User Not Found! Please Register Yourself" });
        } else {
          res.redirect('/dash');
        }
      })
      .catch((err) => {
        console.error('Failed to find user in MongoDB:', err);
        res.status(500).send('Internal Server Error');
      });
  });
//get register.html
app.get('/register',(req,res)=>{
    res.sendFile(__dirname+'/register.html');
});
//post register
app.post("/register",encoder,(req,res)=>{
    var email=req.body.email; 
    var password=req.body.password;
    console.log(email,password)
    const login = mongoose.model("logins", loginSchema);
    const register = new login({
      Email: email,
      Password:password,
    });
    register.save()
        .then(() => {
            console.log("Successfully saved");
        })
        .catch((error) => {
            console.log("Error saving user:", error);
        });
});
//get dash.html
app.get("/dash",(req,res)=>{
    res.sendFile(__dirname+'/dash.html');
})
//get user.html
app.get("/user", (req, res) => { res.sendFile(__dirname+"/user.html"); });
//post users
app.post("/users",(req,res)=>{
    var name=req.body.name;
    var phno=req.body.phno;
    var email=req.body.email;
    var gender=req.body.gender;
    var username=req.body.username;
    var password=req.body.password;
    var cpassword=req.body.cpassword;
    var role=req.body.role;
    const user=new mongoose.model('user',userSchema);
    const uinsert=new user({
    User_name:name,
    Mobile_Number:phno,
    User_email:email,
    User_gender:gender,
    User_Username:username,
    User_Password:password,
    User_Role:role,
    });
    uinsert.save()
        .then(() => {
            console.log("Successfully saved User");
        })
        .catch((error) => {
            console.log("Error saving user:", error);
        });
});
//get customer.html
app.get('/customer',(req,res)=>{
    res.sendFile(__dirname+"/customer.html");
});
//post customer
app.post('/customers', (req, res)=>{
    var cname=req.body.cname;
    var cgroup=req.body.cgroup;
    var cphno=req.body.phno;
    var cemail=req.body.email;
    var ccountry=req.body.country;
    var ccity=req.body.city;
    var caddress=req.body.address;
    var czip=req.body.zip;
    const customer=new mongoose.model('customer',customerSchema);
    const cinsert=new customer({
    Customer_Name:cname,
    Customer_Group:cgroup,
    Customer_Mobile_Number:cphno,
    Customer_Email:cemail,
    Customer_Country:ccountry,
    Customer_City:ccity,
    Customer_Address:caddress,
    Customer_Zipcode:czip,
    });
    cinsert.save()
        .then(() => {
            console.log("Successfully saved Customer");
        })
        .catch((error) => {
            console.log("Error saving Customer:", error);
        });
    
});
//get supplier.html
app.get('/supplier',(req,res)=>{
    res.sendFile(__dirname+"/supplier.html");
});
//post supplier
app.post('/supplierr',(req,res)=>{
    var sname=req.body.sname;
    var sphno=req.body.phno;
    var semail=req.body.email;
    var scountry=req.body.country;
    var scity=req.body.city;
    var saddress=req.body.address;
    var szip=req.body.zip;
    var scompany=req.body.company;
    var scode=req.body.scode;
    const supplier=new mongoose.model('supplier',supplierSchema);
    const sinsert=new supplier({
    Supplier_Name:sname,
    Supplier_Mobile_Number:sphno,
    Supplier_Email:semail,
    Supplier_Country:scountry,
    Supplier_City:scity,
    Supplier_Address:saddress,
    Supplier_Zipcode:szip,
    Supplier_Company:scompany,
    Supplier_Code:scode,
    })
    sinsert.save()
    .then(() => {
        console.log("Successfully saved Supplier");
    })
    .catch((error) => {
        console.log("Error saving Supplier:", error);
    });
});
//get addproduct.html
app.get('/product',(req,res)=>{
    res.sendFile(__dirname+'/addproduct.html');
});
//post addproduct
app.post('/addproduct',(req,res)=>{   
    var pname=req.body.prname;
    var pcategory=req.body.category;
    var pcost=req.body.cost;
    var pstock=req.body.stock;
    var ptotal=req.body.total;
    const addproduct=new mongoose.model('addproduct',addproductSchema);
    const pinsert=new addproduct({
    Product_Name:pname,
    Product_Category:pcategory,
    Product_Cost:pcost,
    Product_Stock:pstock,
    Product_Total:ptotal,
    });
    pinsert.save()
    .then(() => {
        console.log("Successfully Added Product");
    })
    .catch((error) => {
        console.log("Error Adding Product:", error);
    });
});
//get purchase.html
app.get('/purchase',(req,res)=>{
    res.sendFile(__dirname+'/addpurchase.html');
});
//post purchase
app.post('/purchased',(req,res)=>{
    var pdate=req.body.date;
    var phouse=req.body.warehouse;
    var psupplier=req.body.sup;
    var pname=req.body.product;
    var pquantity=req.body.quantity;
    var pcost=req.body.cost;
    var ppayment=req.body.payment;
    const purchase=new mongoose.model('purchase',purchaseSchema);
    const purinsert=new purchase({
        Purchase_Date:pdate,
        Purchase_House:phouse,
        Purchase_Supplier:psupplier,
        Purchase_Name:pname,
        Purchase_Quantity:pquantity,
        Purchase_Cost:pcost,
        Purchase_Payment:ppayment,
    });
    purinsert.save()
    .then(() => {
        console.log("Successfully Added Purchase");
    })
    .catch((error) => {
        console.log("Error Adding Purchase:", error);
    });
});
//get newsale.hmtl
app.get('/newsale',(req,res)=>{
    res.sendFile(__dirname+'/newsale.html');
});
//postnewsale
app.post('/newsales',(req,res)=>{
    var sdate=req.body.date;
    var swarehouse=req.body.warehouse;
    var sbiller=req.body.biller;
    var scustomer=req.body.customer;
    var sship=req.body.ship;
    var sstatus=req.body.status;
    var spayment=req.body.payment;
    const newsale=new mongoose.model('sale',newsaleSchema);
    const ninsert=new newsale({
        Sale_Date:sdate,
        Sale_WareHouse:swarehouse,
        Sale_Biller:sbiller,
        Sale_Customer:scustomer,
        Sale_Shipment:sship,
        Sale_Status:sstatus,
        Sale_Payment:spayment,
    });
    ninsert.save()
    .then(() => {
        console.log("Successfully Added NewSale");
    })
    .catch((error) => {
        console.log("Error Adding NewSale:", error);
    });
});
//get warehouse.html
app.get('/warehouse',(req,res)=>{
    res.sendFile(__dirname+'/warehouse.html');
})
//post warehouse
app.post('/ware',(req,res)=>{
    var warename=req.body.wname;
    var wareid=req.body.wareid;
    var wareinc=req.body.wiid;
    var inname=req.body.winame;
    var mobile=req.body.phnno;
    var email=req.body.email;
    var gender=req.body.gender;
    var loc=req.body.wloc;
    var country=req.body.wcountry;
    var city=req.body.wcity;m
    var addrs=req.body.waddress;
    const newware=new mongoose.model('warehouse',warehouseSchema);
    const winsert=new newware({
        Warehouse_Name:warename,
        Warehouse_Select:wareid,
        Warehouse_Incharge_Id:wareinc,
        Warehouse_Incharge:inname,
        Warehouse_Incharge_Mobile:mobile,
        Warehouse_Incharge_Email:email,
        Warehouse_Incharge_Gender:gender,
        Warehouse_Location:loc,
        Warehouse_Country:country,
        Warehouse_City:city,
        Warehouse_Address:addrs,
    });
    winsert.save()
    .then(() => {
        console.log("Successfully Added WareHouse");
    })
    .catch((error) => {
        console.log("Error Adding WareHouse:", error);
    });

});
//userlist
app.get('/userlist',(req,res)=>{
    const user=new mongoose.model('user',userSchema);
    user.find({})
    .then(data => {
      res.render('userlist', { data: data });
    })
    .catch(err => {
      console.log('Failed to retrieve data from MongoDB:', err);
    });
})
//supplierlist
app.get('/supplierlist',(req,res)=>{
    const supplier=new mongoose.model('supplier',supplierSchema);
    supplier.find({})
     .then(data=>{
        res.render('supplierlist',{data:data})
     }) 
     .catch(err => {
        console.log('Failed to retrieve data from MongoDB:', err);
      });
})
//customerlist
app.get('/customerlist',(req,res)=>{
    const customer=new mongoose.model('customer',customerSchema);
    customer.find({})
     .then(data=>{
        res.render('customerlist',{data:data})
     }) 
     .catch(err => {
        console.log('Failed to retrieve data from MongoDB:', err);
      });
})
//productlist
app.get('/productlist',(req,res)=>{
    const addproduct=new mongoose.model('addproduct',addproductSchema);
    addproduct.find({})
     .then(data=>{
        res.render('productlist',{data:data})
     }) 
     .catch(err => {
        console.log('Failed to retrieve data from MongoDB:', err);
      });
})
//salelist
app.get('/salelist',(req,res)=>{
    const newsale=new mongoose.model('sale',newsaleSchema);
    newsale.find({})
     .then(data=>{
        res.render('salelist',{data:data})
     }) 
     .catch(err => {
        console.log('Failed to retrieve data from MongoDB:', err);
      });
})
//warehouselist
app.get('/warehouselist',(req,res)=>{
    const newware=new mongoose.model('warehouse',warehouseSchema);
    newware.find({})
     .then(data=>{
        res.render('warehouselist',{data:data})
     }) 
     .catch(err => {
        console.log('Failed to retrieve data from MongoDB:', err);
      });
})
//purchaselist
app.get('/purchaselist',(req,res)=>{
    const purchase=new mongoose.model('purchase',purchaseSchema);
    purchase.find({})
     .then(data=>{
        res.render('purchaselist',{data:data})
     }) 
     .catch(err => {
        console.log('Failed to retrieve data from MongoDB:', err);
      });
})
//listening port
app.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
});