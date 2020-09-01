//
//  ReviewView.swift
//  searchPlace
//
//  Created by Xiaoyi He on 11/4/18.
//  Copyright © 2018 Xiaoyi He. All rights reserved.
//

import Foundation
import UIKit
import Kingfisher
import Alamofire

class ReviewView: UIViewController, UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return reviewArray?.count ?? 0
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cellIdentifier = "reviewCell"
        guard let cell: ReviewCell = self.reviewTableView.dequeueReusableCell(withIdentifier: cellIdentifier) as! ReviewCell else {
            fatalError("The dequeued cell is not an instance of reviewcell")
        }
        let review = reviewArray![indexPath.row] as! [String: Any]
        let authorName = review["author_name"] as? String ?? ""
        let rating = Double(review["rating"] as? Int ?? 0)
//        let reviewTime = "\(review["time"])" as! String
        let reviewText = review["text"] as? String ?? ""
        let timeItv: TimeInterval = TimeInterval(review["time"] as? Int ?? 0)
        let date = Date(timeIntervalSince1970: timeItv)
        let dateformatter = DateFormatter()
        dateformatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
        let time = dateformatter.string(from: date)
        cell.authorName.text = authorName
        cell.reviewRate.rating = rating
        cell.reviewTime.text = time
        cell.reviewText.text = reviewText
        let avatarUrlString = review["profile_photo_url"] as? String ?? ""
        let avatarUrl = URL(string: avatarUrlString)
        cell.authorImg.kf.setImage(with: avatarUrl)
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if let url = URL(string: (reviewArray![indexPath.row] as AnyObject)["author_url"] as! String) {
            UIApplication.shared.open(url, options: [:])
        }
    }
    
    private func showGgReview() {
        self.reviewArray = self.ggReview
        if self.reviewArray == nil {
            self.noReview()
        }
        else {
            self.hasReview()
        }
    }
    
    private func showYelpReview() {
        self.reviewArray = self.yelpReview
        if self.reviewArray == nil {
            self.noReview()
        }
        else {
            self.hasReview()
        }
    }
    
    private func getYelpReview() {
        let tmpdata = (yelpInfo!["addr"] as! NSArray).map{$0 as! [String:Any]}
        let info = tmpdata.map {
            data -> [String: String] in
            let type = data["types"] as! NSArray
            return [type[0] as! String: data["short_name"] as! String]
        }
        let flatinfo = info
            .flatMap { $0 }
            .reduce([String:String]()) { (dict, tuple) in
                var nextDict = dict
                nextDict.updateValue(tuple.1, forKey: tuple.0)
                return nextDict
        }
        var address = ""
        address += (flatinfo["street_number"] != nil) ? flatinfo["street_number"]! : ""
        address += (flatinfo["route"] != nil) ? " " + flatinfo["route"]! : ""
        let params:Parameters = [
            "name": yelpInfo!["name"] as! String,
            "address": address,
            "city": flatinfo["locality"] as! String,
            "state": flatinfo["administrative_area_level_1"] as! String,
            "country": flatinfo["country"] as! String
        ]
        Alamofire.request("http://searchplace-env.us-east-2.elasticbeanstalk.com/api/yelp_review", parameters: params).responseJSON {
            response in
            switch response.result {
            case .success: do {
                self.hasReview()
                print("success get yelp reviews")
                print(response.result.value)
                self.yelpReview = self.dealWithYelpReview(review: response.result.value as! NSArray)
                self.showYelpReview()
                DispatchQueue.main.async(execute: self.reviewTableView.reloadData)
//                print(self.yelpReview)
                }
            case .failure(let error):
                let err = error as! AFError
                if err.isResponseSerializationError {
                    self.yelpReview = nil
                    self.reviewArray = nil
                    self.noReview()
                    print("no reviews")
                }
            }
        }
    }
    
    private func noReview() {
        self.reviewTableView.backgroundView = self.noReviewView
    }
    
    private func hasReview() {
        self.reviewTableView.backgroundView = nil
    }
    
    func dealWithYelpReview(review: NSArray) -> NSArray {
        let tmp = review.map {$0 as! [String: Any]}
        let rev = tmp.map {
            data -> [String: Any] in
            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
            let time = dateFormatter.date(from: data["time_created"] as! String)?.timeIntervalSince1970 as! Double
            return ["rating": data["rating"] as! Int, "text": data["text"] as! String, "author_url": data["url"] as! String, "time": Int(time), "author_name": (data["user"] as! [String:Any])["name"], "profile_photo_url": (data["user"] as! [String:Any])["image_url"]]
        }
        return rev as NSArray
    }
    
    @objc func reviewTypeChanged(segment: UISegmentedControl) {
        reviewTableView.setContentOffset(CGPoint.zero, animated: false)
        if segment.selectedSegmentIndex == 0 {
            if self.ggReview != nil {
                self.hasReview()
                showGgReview()
            }
            else {
                self.noReview()
            }
        }
        else {
            if yelpReview == nil {
                getYelpReview()
            }
            else {
                showYelpReview()
            }
            
        }
        self.selectReviewType = segment.selectedSegmentIndex
        sortReviews(order: self.selectSortBy)
        DispatchQueue.main.async(execute: self.reviewTableView.reloadData)
//
    }
    
    @objc func reviewOrderChanged(segment: UISegmentedControl) {
        let order = sortBy(rawValue: segment.selectedSegmentIndex)
        self.selectSortBy = order!
        if self.reviewArray != nil {
            self.sortReviews(order: order!)
        }
        
    }
    
    @objc func orderChanged(segment: UISegmentedControl) {
        self.selectOrder = segment.selectedSegmentIndex
        sortReviews(order: selectSortBy)
//        if self.selectOrder == 0 && self.selectSortBy != .Default && self.reviewArray != nil {
//            self.reviewArray = self.reviewArray?.reversed() as! NSArray
//            DispatchQueue.main.async(execute: self.reviewTableView.reloadData)
//        }
    }
    
    func sortReviews(order: sortBy) {
        switch order {
        case .Default:
            if self.selectReviewType == 0 {
                self.reviewArray = self.ggReview
            }
            else {
                self.reviewArray = self.yelpReview
            }
            DispatchQueue.main.async(execute: self.reviewTableView.reloadData)
        case .Date:
            let sortedReview = reviewArray?.sorted {
                (a, b) -> Bool in
                return (a as! AnyObject)["time"] as! Int > (b as! AnyObject)["time"] as! Int
            }
            self.reviewArray = sortedReview as! NSArray
            DispatchQueue.main.async(execute: self.reviewTableView.reloadData)
            
        case .Rating:
            let sortedReview = reviewArray?.sorted {
                (a, b) -> Bool in
                return (a as! AnyObject)["rating"] as! Int > (b as! AnyObject)["rating"] as! Int
            }
            self.reviewArray = sortedReview as! NSArray
            DispatchQueue.main.async(execute: self.reviewTableView.reloadData)
        default:
            return
        }
        if self.selectOrder == 0 && self.selectSortBy != .Default && self.reviewArray != nil {
            self.reviewArray = self.reviewArray?.reversed() as! NSArray
            DispatchQueue.main.async(execute: self.reviewTableView.reloadData)
        }

    }
    
    enum sortBy: Int {
        case Default = 0
        case Rating
        case Date
        
        init?(index: Int) {
            switch index {
            case 0: self = .Default
            case 1: self = .Rating
            case 2: self = .Date
            default:
                return nil
            }
        }
    }
    
    var reviewData: AnyObject?
    var reviewArray: NSArray?
    var ggReview: NSArray?
    var yelpReview: NSArray?
    var yelpInfo: [String: Any]?
    
    private var selectOrder: Int = 0
    private var selectReviewType: Int = 0
    private var selectSortBy: sortBy = .Default
    
    @IBOutlet weak var orderTypeView: UISegmentedControl!
    @IBOutlet weak var sortByTypeView: UISegmentedControl!
    @IBOutlet weak var reviewTypeView: UISegmentedControl!
    @IBOutlet weak var reviewTableView: UITableView!
    @IBOutlet weak var noReviewView: UIView!
    override func viewDidLoad() {
        super.viewDidLoad()
        self.reviewTableView.delegate = self
        self.reviewTableView.dataSource = self
        self.reviewTableView.rowHeight = 200
        reviewArray = reviewData as? NSArray ?? nil
        ggReview = reviewArray
        if ggReview == nil {
            self.noReview()
        }
        else {
            self.hasReview()
        }
        reviewTypeView.addTarget(self, action: #selector(reviewTypeChanged), for: .valueChanged)
        sortByTypeView.addTarget(self, action: #selector(reviewOrderChanged), for: .valueChanged)
        orderTypeView.addTarget(self, action: #selector(orderChanged), for: .valueChanged)
    }
}
