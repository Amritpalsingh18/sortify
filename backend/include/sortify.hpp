#pragma once
#include <algorithm>
#include <chrono>
#include <string>
#include <vector>
namespace sortify {
struct Product{int id{};std::string name,category;double price{},rating{},discount{};int popularity{},stock{};};
using Cmp=bool(*)(const Product&,const Product&);
inline Cmp getCmp(const std::string&key,bool asc){static Cmp funcs[]={[](auto&a,auto&b){return a.price<b.price;},[](auto&a,auto&b){return a.rating<b.rating;},[](auto&a,auto&b){return a.popularity<b.popularity;},[](auto&a,auto&b){return a.discount<b.discount;},[](auto&a,auto&b){return a.name<b.name;},[](auto&a,auto&b){return a.price>b.price;},[](auto&a,auto&b){return a.rating>b.rating;},[](auto&a,auto&b){return a.popularity>b.popularity;},[](auto&a,auto&b){return a.discount>b.discount;},[](auto&a,auto&b){return a.name>b.name;}};int i=key=="rating"?1:key=="popularity"?2:key=="discount"?3:key=="name"?4:0;return funcs[i+(asc?0:5)];}
inline void bubble(std::vector<Product>&a,Cmp c){for(size_t n=a.size();n>1;--n){bool sw=false;for(size_t i=1;i<n;++i)if(c(a[i],a[i-1])){std::swap(a[i],a[i-1]);sw=true;}if(!sw)break;}}
inline void selection(std::vector<Product>&a,Cmp c){for(size_t i=0;i<a.size();++i){size_t m=i;for(size_t j=i+1;j<a.size();++j)if(c(a[j],a[m]))m=j;std::swap(a[i],a[m]);}}
inline void insertion(std::vector<Product>&a,Cmp c){for(size_t i=1;i<a.size();++i){auto v=a[i];size_t j=i;while(j&&c(v,a[j-1]))a[j]=a[--j];a[j]=v;}}
inline void mergeSort(std::vector<Product>&a,Cmp c){if(a.size()<2)return;size_t m=a.size()/2;std::vector<Product>l(a.begin(),a.begin()+m),r(a.begin()+m,a.end());mergeSort(l,c);mergeSort(r,c);size_t i=0,j=0,k=0;while(i<l.size()&&j<r.size())a[k++]=c(r[j],l[i])?r[j++]:l[i++];while(i<l.size())a[k++]=l[i++];while(j<r.size())a[k++]=r[j++];}
inline void quickSort(std::vector<Product>&a,Cmp c,int lo,int hi){if(lo>=hi)return;auto p=a[hi];int i=lo;for(int j=lo;j<hi;++j)if(c(a[j],p))std::swap(a[i++],a[j]);std::swap(a[i],a[hi]);quickSort(a,c,lo,i-1);quickSort(a,c,i+1,hi);}
inline void heapSort(std::vector<Product>&a,Cmp c){std::make_heap(a.begin(),a.end(),c);std::sort_heap(a.begin(),a.end(),c);}
inline double sort(std::vector<Product>&a,const std::string&algo,const std::string&key,bool asc=true){Cmp c=getCmp(key,asc);auto t=std::chrono::steady_clock::now();if(algo=="bubble")bubble(a,c);else if(algo=="selection")selection(a,c);else if(algo=="insertion")insertion(a,c);else if(algo=="quick")quickSort(a,c,0,(int)a.size()-1);else if(algo=="heap")heapSort(a,c);else mergeSort(a,c);return std::chrono::duration<double,std::milli>(std::chrono::steady_clock::now()-t).count();}
}
