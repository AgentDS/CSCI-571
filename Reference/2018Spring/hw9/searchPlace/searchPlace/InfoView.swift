//
//  InfoView.swift
//  searchPlace
//
//  Created by Xiaoyi He on 11/4/18.
//  Copyright © 2018 Xiaoyi He. All rights reserved.
//

import Foundation
import UIKit
import Cosmos

class InfoView: UIViewController {
    var infoData: [String: Any]?
    
    @IBOutlet weak var phoneNumber: UITextView!
    @IBOutlet weak var address: UILabel!
    @IBOutlet weak var priceLevel: UILabel!
    @IBOutlet weak var rating: CosmosView!
    @IBOutlet weak var website: UITextView!
    @IBOutlet weak var ggPage: UITextView!
    @IBOutlet weak var noRatingTextField: UILabel!
    override func viewDidLoad() {
        super.viewDidLoad()
        print(infoData)
        let noResult = "No result"
        let title = infoData!["name"] as! String
        self.rating.settings.updateOnTouch = false
        if infoData!["rating"] != nil {
            self.rating.alpha = 1
            self.noRatingTextField.alpha = 0
            self.rating.rating = Double(infoData!["rating"] as! Float)
        }
        else {
            self.rating.alpha = 0
            self.noRatingTextField.alpha = 1
        }
        
            self.address.text = infoData!["formatted_address"] as? String ?? noResult
            self.phoneNumber.text = infoData!["international_phone_number"] as? String ?? noResult
            self.website.text = infoData!["website"] as? String ?? noResult
            self.ggPage.text = infoData!["url"] as? String ?? noResult
        
        if infoData! ["price_level"] != nil {
            self.priceLevel.text = priceLvlMap[infoData! ["price_level"] as! Int]
        }
        else {
            self.priceLevel.text = noResult
        }
        
    }

    private var priceLvlMap = ["", "$", "$$", "$$$", "$$$$", "$$$$$"]
    

}

