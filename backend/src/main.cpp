#include "sortify.hpp"
#include <iostream>
int main(){std::vector<sortify::Product>p={{1,"Nova Headphones","Electronics",2499,4.6,15,870,28},{2,"Trail Backpack","Fashion",1799,4.3,20,540,45},{3,"Smart Watch X","Electronics",5999,4.8,10,1200,16},{4,"Everyday Sneakers","Fashion",3299,4.1,25,690,32},{5,"Desk Lamp","Home",999,4.5,12,420,73}};auto ms=sortify::sort(p,"merge","price");std::cout<<"Sortify C++ Engine - Merge Sort by price\n";for(auto&x:p)std::cout<<x.name<<" | Rs."<<x.price<<" | Rating "<<x.rating<<"\n";std::cout<<"Elapsed: "<<ms<<" ms\n";}
