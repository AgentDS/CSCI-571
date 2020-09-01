//
//  ResultView.swift
//  searchPlace
//
//  Created by Xiaoyi He on 10/4/18.
//  Copyright © 2018 Xiaoyi He. All rights reserved.
//

import UIKit
import Kingfisher
import Alamofire
import SwiftSpinner
import EasyToast


class ResultViewController: UIViewController, UITableViewDelegate, UITableViewDataSource, ResultCellDelegate {
    let userDefault = UserDefaults.standard
    
    var data : AnyObject?
    var result: NSArray?
    var details: AnyObject?
    var isFavorite = [Bool](repeating: false, count: 20)
    var resultStored: [NSArray] = []
    var nextPageToken: String?
    var selectIndex: Int?
    var favStored: [String: Any]?
    private var currentPage: Int = 1
    @IBOutlet weak var prevButtonView: UIButton!
    @IBOutlet weak var nextbuttonView: UIButton!
    @IBOutlet weak var resultTable: UITableView!
    @IBOutlet weak var noResultView: UIView!
    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "Search Results"
        self.navigationItem.backBarButtonItem = UIBarButtonItem(title: "", style: .plain, target: nil, action: nil)
        favStored = userDefault.object(forKey: "favorite") as? [String: Any]
        if favStored == nil {
            favStored = [:]
        }
        print(favStored)
        resultTable.delegate = self
        resultTable.dataSource = self
        self.resultTable.rowHeight = 90
        self.result = (self.data!["results"] as? NSArray)!
        self.nextPageToken = self.data!["next_page_token"] as? String
        self.resultStored.append(self.result!)
        prevButtonView.isEnabled = false
        self.checkFavorite()
        if nextPageToken == nil {
            nextbuttonView.isEnabled = false
        }
        if self.result?.count == 0 {
            self.resultTable.backgroundView = noResultView
        }
        else {
            self.resultTable.backgroundView = nil
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    func setFavorite(cellResult: [String:Any]) {
        let name = cellResult["name"] as! String
        let placeId = cellResult["place_id"] as! String
        self.view.showToast("\(name) was added to favorites!", position: .bottom, popTime: 2, dismissOnTap: false)
        let favData = ["name": name, "address": cellResult["vicinity"] as! String, "placeId": placeId, "icon": cellResult["icon"] as! String]
        self.favStored![placeId] = favData
        userDefault.set(self.favStored, forKey: "favorite")
    }
    
    func removeFavorite(cellResult: [String: Any]) {
        let name = cellResult["name"] as! String
        let placeId = cellResult["place_id"] as! String
        self.view.showToast("\(name) was removed from favorites!", position: .bottom, popTime: 2, dismissOnTap: false)
        self.favStored?.removeValue(forKey: placeId)
        userDefault.set(self.favStored, forKey: "favorite")
    }
    
    func buttonTapped(cell: ResultCell) {
        let index = self.resultTable.indexPath(for: cell)!.row
        let cellResult = self.result![index] as! [String: Any]
        
        if self.isFavorite[index] {
            removeFavorite(cellResult: cellResult)
        }
        else {
            setFavorite(cellResult: cellResult)
        }
        
        self.isFavorite[index] = !self.isFavorite[index]
        DispatchQueue.main.async(execute: self.resultTable.reloadData)
    }
    
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return (self.result?.count)!
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        SwiftSpinner.show("Loading")
        self.selectIndex = indexPath.row
        let params:Parameters = [
            "placeId": (self.result![indexPath.row] as AnyObject)["place_id"] as! String
        ]
        Alamofire.request("http://searchplace-env.us-east-2.elasticbeanstalk.com/api/details", parameters: params).responseJSON {
            response in
            switch response.result {
            case .success: do {
                print("success get details")
                self.details = response.result.value as AnyObject
                self.myPerformSurge(identifier: "showDetails")
                SwiftSpinner.hide()
                }
            case .failure(let error):
                print(error)
            }
        }
    }
    
    private func myPerformSurge(identifier: String) {
        performSegue(withIdentifier: identifier, sender: self)
    }
    
    @objc func tweet() {
        print("tweet")
        let resultObj = self.details?["result"] as AnyObject
        let urlString = "https://twitter.com/intent/tweet?text=Check out \(resultObj["name"]! as! String) at \(resultObj["formatted_address"]! as? String ?? "" ). Website: &hashtags=TravelAndEntertainmentSearch&url=\(resultObj["website"] as? String ?? "" )"
        print(urlString)
        let url = urlString.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
        print(url)
        if let urlopen = URL(string: url!) {
            UIApplication.shared.open(urlopen, options: [:])
        }
        
    }
    
    @objc func like() {
        print("like")
        let cellResult = self.result![self.selectIndex!] as! [String: Any]
        if self.isFavorite[self.selectIndex!] {
            self.removeFavorite(cellResult: cellResult)
        }
        else {
            self.setFavorite(cellResult: cellResult)
        }
        self.isFavorite[self.selectIndex!] = !self.isFavorite[self.selectIndex!]
        self.updateNavbar(isFavorite: self.isFavorite[self.selectIndex!])
        DispatchQueue.main.async(execute: self.resultTable.reloadData)
    }
    
    func updateNavbar(isFavorite: Bool) {
        let tweet = UIBarButtonItem(image: #imageLiteral(resourceName: "forward"), style: .plain, target: self, action: #selector(self.tweet))
        var like: UIBarButtonItem?
        if isFavorite {
            like = UIBarButtonItem(image: #imageLiteral(resourceName: "heart-filled"), style: .plain, target: self, action: #selector(self.like))
        }
        else {
            like = UIBarButtonItem(image: #imageLiteral(resourceName: "heart-empty"), style: .plain, target: self, action: #selector(self.like))
        }
        self.tabnav?.rightBarButtonItems = [like!, tweet]
    }
    
    var tabnav: UINavigationItem?
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "showDetails" {
            let placeId = (self.details!["result"] as AnyObject)["place_id"] as! String
            let resultObj = self.details?["result"] as AnyObject
            
            let tabViewController: UITabBarController = segue.destination as! UITabBarController
            self.tabnav = tabViewController.navigationItem
            tabViewController.title = resultObj["name"] as? String
            tabnav?.backBarButtonItem = UIBarButtonItem(title: "", style: .plain, target: nil, action: nil)
            let tweet = UIBarButtonItem(image: #imageLiteral(resourceName: "forward"), style: .plain, target: self, action: #selector(self.tweet))
            var like: UIBarButtonItem?
            if self.isFavorite[self.selectIndex!] {
                like = UIBarButtonItem(image: #imageLiteral(resourceName: "heart-filled"), style: .plain, target: self, action: #selector(self.like))
            }
            else {
                like = UIBarButtonItem(image: #imageLiteral(resourceName: "heart-empty"), style: .plain, target: self, action: #selector(self.like))
            }
            
            tabViewController.navigationItem.rightBarButtonItems = [like!, tweet]
            let infoViewController: InfoView = tabViewController.viewControllers?[0] as! InfoView
            let photoViewController: PhotosView = tabViewController.viewControllers?[1] as! PhotosView
            let mapViewController: MapView = tabViewController.viewControllers?[2] as! MapView
            let reviewViewController: ReviewView = tabViewController.viewControllers?[3] as! ReviewView
            let yelpInfo: [String: Any] = [
                "name": resultObj["name"] as! String,
                "addr": resultObj["address_components"] as! NSArray
            ]
            infoViewController.infoData = self.details?["result"] as! [String: Any]
//            let photos = (self.details?["result"] as AnyObject)["photos"] as AnyObject
            photoViewController.placeId = placeId
            reviewViewController.reviewData = resultObj["reviews"] as AnyObject
            reviewViewController.yelpInfo = yelpInfo
            mapViewController.geodata = resultObj["geometry"] as AnyObject
        }
    }
    
    
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cellIdentifier = "cell"
        guard let cell: ResultCell = self.resultTable.dequeueReusableCell(withIdentifier: cellIdentifier) as! ResultCell else {
            fatalError("The dequeued cell is not an instance of ResultCell")
        }
        cell.delegate = self
        let address = (self.result![indexPath.row] as AnyObject)["vicinity"] as! String
        let name = (self.result![indexPath.row] as AnyObject)["name"] as! String
        let iconUrlString = (self.result![indexPath.row] as AnyObject)["icon"] as! String
        let iconUrl = URL(string: iconUrlString)
        cell.icon.kf.setImage(with: iconUrl)
        cell.address.text = address
        cell.placeName.text = name
        cell.contentView.isUserInteractionEnabled = true
        if isFavorite[indexPath.row] {
            cell.favorite.setImage(#imageLiteral(resourceName: "heart-filled"), for: .normal)
        } else {
            cell.favorite.setImage(#imageLiteral(resourceName: "heart-empty"), for: .normal)
        }
        
        return cell
//        cell.icon.image
    }
    
    @IBAction func getPrevPage(_ sender: Any) {
        self.result = self.resultStored[currentPage-2]
        currentPage -= 1
        if currentPage == 1 {
            self.prevButtonView.isEnabled = false
        }
        self.nextbuttonView.isEnabled = true
        self.isFavorite = self.isFavorite.map {_ in false}
        self.checkFavorite()
        self.resultTable.setContentOffset(CGPoint.zero, animated: false)
        DispatchQueue.main.async(execute: self.resultTable.reloadData)
        
    }
    
    @IBAction func getNextPage(_ sender: Any) {
        if (resultStored.count) > currentPage {
            self.result = self.resultStored[currentPage]
            if currentPage + 1 == resultStored.count {
                self.nextbuttonView.isEnabled = false
            }
            self.isFavorite = self.isFavorite.map {_ in false}
            self.checkFavorite()
            resultTable.setContentOffset(CGPoint.zero, animated: false)
            DispatchQueue.main.async(execute: self.resultTable.reloadData)
        }
        else {
            let params: Parameters = [
                "pagetoken": self.nextPageToken!
            ]
            SwiftSpinner.show("Fetching next page...")
            Alamofire.request("http://searchplace-env.us-east-2.elasticbeanstalk.com/api/nextpage", parameters: params).responseJSON {
                response in
                switch response.result {
                case .success:
                    print("next")
                    print(response.result.value)
                    let resvalue = response.result.value as! [String: Any]
                    if let pagetoken = resvalue["next_page_token"] {
                        self.nextPageToken = pagetoken as! String
                    }
                    else {
                        self.nextPageToken = nil
                        self.nextbuttonView.isEnabled = false
                    }
                    self.result = resvalue["results"] as! NSArray
                    self.resultStored.append(self.result!)
                    self.isFavorite = self.isFavorite.map {_ in false}
                    self.checkFavorite()
                    self.resultTable.setContentOffset(CGPoint.zero, animated: false)
                    DispatchQueue.main.async(execute: self.resultTable.reloadData)
                    SwiftSpinner.hide()
                case .failure(let err):
                    print(err)
                    SwiftSpinner.hide()
                }
            }
        }
        currentPage += 1
        self.prevButtonView.isEnabled = true
    }
    
    func checkFavorite() {
        if let savedKeys = self.favStored?.keys {
            for (index, data) in (self.result?.enumerated())! {
                let cellResult = data as! [String: Any]
                if savedKeys.contains(cellResult["place_id"] as! String) {
                    self.isFavorite[index] = true
                }
            }
        }
    }
    

}
