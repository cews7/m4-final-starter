require 'rails_helper'

describe 'filter' do
  context 'as a user on links#index' do
    let!(:user) { create(:user) }

    before do
      create(:link, title: 'cake', user: user)
      create(:link, title: 'lemon', user: user)
      allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
      visit links_path
    end

    describe 'I enter the search field' do
      xit 'links displayed are matched to results' do
        fill_in "content-filter", with: 'lemon'
        expect(page).to_not have_content 'cake'
      end
    end
  end
end
