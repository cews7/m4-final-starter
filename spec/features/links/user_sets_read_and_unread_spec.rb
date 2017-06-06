require 'rails_helper'

describe 'mark links as read or unread' do
  context 'as a user on links#index' do
    let!(:user) { create(:user) }

    before do
      create_list(:link, 3, user: user)
      user.links.first.update(read: true)
      allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
      visit links_path
    end

    describe 'my unread links' do
      it 'I should see a button: mark as read' do
        user.links.where(read: false).ids.each do |id|
          within "#link#{id}" do
            expect(page).to have_button "Mark as Read"
          end
        end
        expect(Link.count).to eq 3
      end
    end

    describe 'when I click: mark as read' do
      xit 'it flips to true' do

        within "#link#{user.links.first.id}" do
          expect(page).to have_content 'Read? false'

          click_on "Mark as Read"

          expect(page).to have_content 'Read? true'
        end
      end
    end
  end
end
